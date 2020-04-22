import { NetworkManagerTypes } from './types';
import { BodyEntry } from 'dbus-native';
import {
  dbusInvoker,
  getProperty
} from './dbus';

export interface WirelessNetwork {
  iface: string;
  ssid: string;
  password?: string;
}

export interface NetworkDevice {
  iface: string;  // IP interface name
  path: string; // DBus object path
}

const nm: string = 'org.freedesktop.NetworkManager';

export const createHotspot = async (network: WirelessNetwork): Promise<any> => {
  try {
    const connectionParams: BodyEntry[] = [
      ['connection', [
        ['id', ['s', network.ssid]],
        ['type', ['s', '802-11-wireless']],
      ]],
      ['802-11-wireless', [
        ['ssid', ['ay', stringToArrayOfBytes(network.ssid)]],
        ['mode', ['s', 'ap']],
      ]],
      ['802-11-wireless-security', [
        ['key-mgmt', ['s', 'wpa-psk']],
        ['psk', ['s', network.password]],
      ]],
      ['ipv4', [
        ['method', ['s', 'shared']],
      ]],
      ['ipv6', [
        ['method', ['s', 'ignore']],
      ]],
    ];

    let device = await getPathByIface(network.iface);
    let connection = await addConnection(connectionParams);
    let result = await activateConnection(connection, device);
    return result
  } catch (error) {
    console.log(`Error creating Hotspot: ${error}`);
  }
};

export const connectToWifi = async (network: WirelessNetwork): Promise<any> => {
  try {
    const connectionParams = [
      ['connection', [
        ['id', ['s', network.ssid]],
        ['type', ['s', '802-11-wireless']],
      ]],
      ['802-11-wireless', [
        ['ssid', ['ay', stringToArrayOfBytes(network.ssid)]],
        ['mode', ['s', 'infrastructure']],
      ]],
      ['802-11-wireless-security', [
        ['key-mgmt', ['s', 'wpa-psk']],
        ['psk', ['s', network.password]],
      ]],
      ['ipv4', [
        ['method', ['s', 'auto']],
      ]],
      ['ipv6', [
        ['method', ['s', 'auto']],
      ]],
    ];

    let device = await getPathByIface(network.iface);
    let connection = await addConnection(connectionParams);
    let result = await activateConnection(connection, device);
    return result
  } catch (error) {
    console.log(`Error connecting to WiFi: ${error}`);
  }
};

export const getWiFiDevices = async (): Promise<NetworkDevice[]> => {
  return await getDevicesByType(NetworkManagerTypes.DEVICE_TYPE.WIFI)
};

export const getWiredDevices = async (): Promise<NetworkDevice[]> => {
  return await getDevicesByType(NetworkManagerTypes.DEVICE_TYPE.ETHERNET)
};

export const getDevicesByType = async(type: number): Promise<NetworkDevice[]> => {
  let paths: string[] = await getDevicesPath()
  let devices: NetworkDevice[] = []

  for await (let path of paths) {
    let deviceType = await getProperty(nm, path, 'org.freedesktop.NetworkManager.Device', 'DeviceType')

    if (deviceType === type) {
      let iface = await getProperty(nm, path, 'org.freedesktop.NetworkManager.Device', 'Interface')
      devices.push({ path, iface })
    }
  }

  return devices
};

export const getDevicesPath = async (): Promise<string[]> => {
  return await dbusInvoker({
    destination: nm,
    path: '/org/freedesktop/NetworkManager',
    interface: 'org.freedesktop.NetworkManager',
    member: 'GetDevices'
  });
};

export const getPathByIface = async (iface: string): Promise<string> => {
  return await dbusInvoker({
    destination: nm,
    path: '/org/freedesktop/NetworkManager',
    interface: 'org.freedesktop.NetworkManager',
    member: 'GetDeviceByIpIface',
    signature: 's',
    body: [iface]
  });
};

export const checkConnectivity = async (): Promise<any> => {
  return await dbusInvoker({
    destination: nm,
    path: '/org/freedesktop/NetworkManager',
    interface: 'org.freedesktop.NetworkManager',
    member: 'CheckConnectivity'
  });
};

export const addConnection = async (params: BodyEntry[]): Promise<any> => {
  return await dbusInvoker({
    destination: nm,
    path: '/org/freedesktop/NetworkManager/Settings',
    interface: 'org.freedesktop.NetworkManager.Settings',
    member: 'AddConnection',
    signature: 'a{sa{sv}}',
    body: [params]
  });
};

export const activateConnection = async (connection: string, path: string) => {
  return await dbusInvoker({
    destination: nm,
    path: '/org/freedesktop/NetworkManager',
    interface: 'org.freedesktop.NetworkManager',
    member: 'ActivateConnection',
    signature: 'ooo',
    body: [connection, path, '/']
  });
};

function stringToArrayOfBytes(str) {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}