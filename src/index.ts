import {
  createAccessPoint,
  connectToWifi,
  getWiFiDevices,
  getWiredDevices
} from "./nm";

// defaults
// const HOTSPOT_IFACE = process.env.HOTSPOT_IFACE || 'wlan0';
const HOTSPOT_SSID = process.env.HOTSPOT_SSID || `WiFi Repeater`;
const HOTSPOT_PASSWORD = process.env.HOTSPOT_PASSWORD || 'charlietheunicorn';
// const WIFI_IFACE = process.env.WIFI_IFACE || 'wlan1';
const WIFI_SSID = process.env.WIFI_SSID;
const WIFI_PASSWORD = process.env.WIFI_PASSWORD;

(async () => {
  // Get available devices
  console.log('-- WiFi repeater: starting...');

  const wifiDevices = await getWiFiDevices();
  const wiredDevices = await getWiredDevices();
  console.log(`Wireless interfaces found: ${wifiDevices.map(d => d.iface).join(', ')}`);
  console.log(`Wired interfaces found: ${wiredDevices.map(d => d.iface).join(', ')}`);

  console.log(wifiDevices);
  console.log(wiredDevices);
  try {

    // Find a wireless device with AP capabilities and create the AP
    const apDevice = wifiDevices.find(device => device.apCapable)
    if (apDevice) {
      console.log(`Creating WiFi AP on ${apDevice.iface} with SSID "${HOTSPOT_SSID}" and password "${HOTSPOT_PASSWORD}"...`);
      await createAccessPoint({ iface: apDevice.iface, ssid: HOTSPOT_SSID, password: HOTSPOT_PASSWORD });
    } else {
      throw new Error(`Could not find Wifi device with AP capabilities.`);
    }

    // If 
    if (!wiredDevices.some(d => d.connected)) {
      const bridgeDevice = wifiDevices.find(device => device.iface !== apDevice.iface);
      if (bridgeDevice && WIFI_SSID && WIFI_PASSWORD) {
        console.log(`Connecting ${bridgeDevice.iface} to WiFi with SSID "${WIFI_SSID}" and password "${WIFI_PASSWORD}"`);
        await connectToWifi({ iface: bridgeDevice.iface, ssid: WIFI_SSID, password: WIFI_PASSWORD });
      } else {
        throw new Error(`Could not find secondary WiFi device or WiFi credentials not found`);
      }
    }
  } catch (error) {
    console.log(error);

  }
})();