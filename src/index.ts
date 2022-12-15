import * as blinking from 'blinking';
import {
  createAccessPoint,
  connectToWifi,
  checkNMConnectivity,
  getWiFiDevices,
  getWiredDevices
} from "./nm";

// defaults
const AP_SSID = process.env.AP_SSID || `WiFi Repeater`;
const AP_PASSWORD = process.env.AP_PASSWORD || '';
const AP_CHANNEL = Number(process.env.AP_CHANNEL) || 1;
const AP_BAND = process.env.AP_BAND || 'bg';
const WIFI_SSID = process.env.WIFI_SSID;
const WIFI_PASSWORD = process.env.WIFI_PASSWORD;

// LED notifications
const ledFile = '/sys/class/leds/led0/brightness';
const led = blinking(ledFile);
const LED_ERROR_PATTERNS = {
  NO_AP_CAPABLE_DEVICE: 2,
  NO_SECONDARY_WIRELESS: 3,
  NO_WIFI_CREDENTIALS: 4,
  NO_INTERNET: 5
};

(async () => {
  console.log('-- WiFi repeater: starting...');

  // Get available devices
  const wifiDevices = await getWiFiDevices();
  const wiredDevices = await getWiredDevices();
  console.log(`Wireless interfaces found: ${wifiDevices.map(d => d.iface).join(', ')}`);
  console.log(`Wired interfaces found: ${wiredDevices.map(d => d.iface).join(', ')}`);

  // Get available devices and find out which are useful. Only interested in:
  // - accessPoint: Any wireless device capable of creating an AP
  // - bridge: Any wireless device excluding accessPoint device
  // - ethernet: Any wired device that has internet connectivity
  const accessPoint = wifiDevices.find(device => device.apCapable);
  const bridge = wifiDevices.find(device => device.iface !== accessPoint?.iface);
  const ethernet = wiredDevices.find(device => device.connected);

  // Create Access Point, required for both modes of operation
  if (!accessPoint) {
    console.log(`Could not find a wireless device with AP capabilities. Exiting...`);
    led.pattern.start({ blinks: LED_ERROR_PATTERNS.NO_AP_CAPABLE_DEVICE, pause: 1000 });
    return;
  }

  console.log(`Creating WiFi AP on ${accessPoint.iface} with SSID "${AP_SSID}", CHANNEL "${AP_CHANNEL}", BAND "${AP_BAND}"...`);
  await createAccessPoint({ iface: accessPoint.iface, ssid: AP_SSID, password: AP_PASSWORD, channel: AP_CHANNEL, band: AP_BAND });

  // Use secondary wireless device for internet if ethernet doesn't do the job.
  if (!ethernet) {
    console.log(`Ethernet device has no internet. Attempting to use secondary wireless device to connect to WiFi...`);

    if (!bridge) {
      console.log(`Could not find a secondary wireless device. Exiting...`);
      led.pattern.start({ blinks: LED_ERROR_PATTERNS.NO_SECONDARY_WIRELESS, pause: 1000 });
      return;
    }

    if (!WIFI_SSID || !WIFI_PASSWORD) {
      console.log(`WiFi credentials for secondary wireless device not provided. Exiting...`);
      led.pattern.start({ blinks: LED_ERROR_PATTERNS.NO_WIFI_CREDENTIALS, pause: 1000 });
      return;
    }

    // Connect secondary wireless interface to WiFi
    console.log(`Connecting ${bridge.iface} to WiFi with SSID "${WIFI_SSID}" and password "${WIFI_PASSWORD}"`);
    await connectToWifi({ iface: bridge.iface, ssid: WIFI_SSID, password: WIFI_PASSWORD });

    // Check if we are now connected to the internet
    let nmConnected = await checkNMConnectivity();
    if (!nmConnected) {
      console.log(`Warning: Could not detect internet access. Bad WiFi credentials provided or WiFi network has no internet access...`);
      led.pattern.start({ blinks: LED_ERROR_PATTERNS.NO_INTERNET, pause: 1000 });
      return;
    }

    console.log(`WiFi repeater started in REPEATER mode.`);
  } else {
    console.log(`WiFi repeater started in AP mode.`);
  }

})();
