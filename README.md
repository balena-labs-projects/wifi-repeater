# wifi-repeater

WiFi Repeater project is a utility to dynamically extend an existing wired or wireless network. To achieve this the utility uses the onboard WiFi chip to create a wireless hotspot you can connect your devices to.
To enable internet access you can either plug an ethernet cable (AP mode) or use a secondary WiFi interface (by using a USB WiFi dongle) to connect to an internet enabled network.

WiFi Repeater can work in the following modes:
- Access Point: extend an existing ethernet connection with an ad-hoc WiFi network
- Repeater: extend an existing wireless connection with an ad-hoc WiFi network. Requires the use of a USB Wifi dongle (see [this](https://www.balena.io/docs/reference/hardware/wifi-dongles/) list for recommended dongles)

## Required hardware
 
 This project has been developed and tested with Rasbperry Pi 3 and 4 though it should work with any board that supports balenaOS.


## Mode: Access Point

Requirement: provide network access through the ethernet port

1. Flash your device with balenaOS
2. Deploy this app
3. Set environment variables (or use defaults)

| Env var | Description | Default |
| ------------- | ------------- | ------------- |
| HOTSPOT_IFACE | Interface where we will create the ad-hoc WiFi network. | `wlan0` |
| HOTSPOT_SSID | Ad-hoc WiFi network name. | `WiFi Repeater` |
| HOTSPOT_PASSWORD | Ad-hoc WiFi network password. | `charlietheunicorn` |


## Mode: Repeater

Requirement: provide network access through a wirless network. Also requires a USB WiFi dongle.

1. Flash your device with balenaOS
2. Deploy this app
3. Connect the USB WiFi dongle
3. Set environment variables (or use defaults)

| Env var | Description | Default |
| ------------- | ------------- | ------------- |
| HOTSPOT_IFACE | Interface where we will create the ad-hoc WiFi network. | `wlan0` |
| HOTSPOT_SSID | Ad-hoc WiFi network name. | `WiFi Repeater` |
| HOTSPOT_PASSWORD | Ad-hoc WiFi network password. | `charlietheunicorn` |
| WIFI_IFACE | Interface that connects to an existing internet enabled WiFi network. | First wireless interface that is not `HOTSPOT_IFACE` |
| WIFI_SSID | WiFi network name | --- |
| WIFI_PASSWORD | WiFi network password | --- |

Note that the onboard wireless interface will always be used as the default interface where the hotspot is created.

