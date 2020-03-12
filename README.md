# [WIP] balenaRepeater


This project uses the onboard WiFi chip to create a wireless network you can connect your devices to. 
To enable internet access you can either plug an ethernet cable (AP mode) or use a secondary WiFi interface (by using a USB WiFi dongle) to connect to an internet enabled network.

balenaRepeater has the following modes:
- AP: ethernet to WiFi 
- Repeater: WiFi to WiFi

## Required hardware
 
- Raspberry Pi 3+/4
- Optional (to use as a repeater): USB WiFi dongle

## To use as a WiFi AP (ethernet --> WiFi)

1. Flash your device with balenaOS
2. Deploy this app
3. Set environment variables (or use defaults)

| Env var | Description | Default |
| ------------- | ------------- | ------------- |
| HOTSPOT_IFACE | Interface where we will create the hotspot network. | `wlan0` |
| HOTSPOT_SSID | Hotspot network name. | `WiFi Repeater` |
| HOTSPOT_PASSWORD  | Hotspot network password. | `charlietheunicorn` |


## To use as a WiFi repeater (WiFi --> WiFi)

1. Flash your device with balenaOS
2. Deploy this app
3. Connect a USB WiFi dongle
3. Set environment variables (or use defaults)

| Env var | Description | Default |
| ------------- | ------------- | ------------- |
| HOTSPOT_IFACE | Interface where we will create the hotspot network. | `wlan0` |
| HOTSPOT_SSID | Hotspot network name. | `WiFi Repeater` |
| HOTSPOT_PASSWORD | Hotspot network password. | `charlietheunicorn` |
| WIFI_IFACE | Interface that connects to an existing internet enabled WiFi network. | First wireless interface that is not `HOTSPOT_IFACE` |
| WIFI_SSID | WiFi network name | |
| WIFI_PASSWORD | WiFi network password | |

