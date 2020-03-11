import {
  createHotspot,
} from "./nm";

const HOTSPOT_IFACE = 'wlan0'

init()
async function init() {
  let response = await createHotspot(HOTSPOT_IFACE, 'tom', '99998888');
  console.log(response);
}


setInterval(() => {
  console.log('...');
}, 5000)