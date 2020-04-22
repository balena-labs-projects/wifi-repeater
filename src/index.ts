import {
  createHotspot,
  connectToWifi,
  getWiFiDevices,
  checkConnectivity,
  NetworkDevice,
  WirelessNetwork
} from "./nm";

(async () => {
  // Get available wireless devices
  let wifiDevices: NetworkDevice[] = await getWiFiDevices()
  console.log(`Wireless interfaces found: ${wifiDevices.map(d => d.iface).join(', ')}`);
  
  // Create hotspot with main WiFi interface
  let hotspot: WirelessNetwork = {
    iface: process.env.HOTSPOT_IFACE || 'wlan0',
    ssid: process.env.HOTSPOT_SSID || `WiFi Repeater`,
    password: process.env.HOTSPOT_PASSWORD || 'charlietheunicorn'
  }

  console.log(`[${hotspot.iface}] Creating ad-hoc WiFi with SSID "${hotspot.ssid}" and password "${hotspot.password}"...`);
  if (wifiDevices.some(d => d.iface === hotspot.iface)) {
    await createHotspot(hotspot);
  } else {
    console.log(`[${hotspot.iface}] Selected interface does not exist. Skipping hotspot creation...`);
  }

  // Connect to WiFi with secondary interface if there is one and credentials were provided
  let secondaryInterfaces: NetworkDevice[] = wifiDevices.filter(d => d.iface !== hotspot.iface)
  if (secondaryInterfaces.length > 0 && process.env.WIFI_SSID && process.env.WIFI_PASSWORD) {
    let wifi: WirelessNetwork = {
      iface: process.env.WIFI_IFACE || secondaryInterfaces[0].iface,
      ssid: process.env.WIFI_SSID,
      password: process.env.WIFI_PASSWORD
    }
    
    console.log(`[${wifi.iface}] Connecting to WiFi with SSID "${wifi.ssid}" and password "${wifi.password}"`);
    await connectToWifi(wifi);
  } else {
    console.log("No secondary WiFi interface or WiFi credentials found, defaulting to ethernet connection...");
  }

  // Revert changes if we have no internet connectivity
  let connectivity = await checkConnectivity()
  console.log(`Connectivity is ${connectivity}`);
})();