import { dbusInvoker } from './dbus';

export const nmService: string = 'org.freedesktop.NetworkManager'

export const createHotspot = async (iface: string, ssid: string, passphrase: string): Promise<any> => {
  try {
    const connectionParams = [
      ['connection', [
        ['id', ['s', ssid]],
        ['type', ['s', '802-11-wireless']],
      ]],
      ['802-11-wireless', [
        ['ssid', ['ay', stringToArrayOfBytes(ssid)]],
        ['mode', ['s', 'ap']],
      ]],
      ['802-11-wireless-security', [
        ['key-mgmt', ['s', 'wpa-psk']],
        ['psk', ['s', passphrase]],
      ]],
      ['ipv4', [
        ['method', ['s', 'shared']],
      ]],
      ['ipv6', [
        ['method', ['s', 'ignore']],
      ]],
    ];

    let device = await getDeviceByIface(iface);
    let connection = await addConnection(connectionParams);
    let result = await activateConnection(connection, device);
    return result
  } catch (error) {
    console.log(`Error creating Hotspot: ${error.message}`);
  }
};

export const getDevices = async (): Promise<string> => {
  return await dbusInvoker({
    destination: nmService,
    path: '/org/freedesktop/NetworkManager',
    interface: 'org.freedesktop.NetworkManager',
    member: 'GetDevices'
  });
};

export const getDeviceByIface = async (iface: string): Promise<string> => {
  return await dbusInvoker({
    destination: nmService,
    path: '/org/freedesktop/NetworkManager',
    interface: 'org.freedesktop.NetworkManager',
    member: 'GetDeviceByIpIface',
    signature: 's',
    body: [iface]
  });
};

export const addConnection = async (params: Array<any>): Promise<any> => {
    return await dbusInvoker({
      destination: nmService,
      path: '/org/freedesktop/NetworkManager/Settings',
      interface: 'org.freedesktop.NetworkManager.Settings',
      member: 'AddConnection',
      signature: 'a{sa{sv}}',
      body: [params]
    });
};

export const activateConnection = async (connection: string, device: string) => {
  return await dbusInvoker({
    destination: nmService,
    path: '/org/freedesktop/NetworkManager',
    interface: 'org.freedesktop.NetworkManager',
    member: 'ActivateConnection',
    signature: 'ooo',
    body: [connection, device, '/']
  });
};

export const getProperty = async (property: string, object: string): Promise<any> => {
  try {
    return await dbusInvoker({
      destination: nmService,
      path: object,
      interface: 'org.freedesktop.DBus.Properties',
      member: 'Get',
      signature: 'ss',
      body: ['org.freedesktop.NetworkManager.Device', property]
    });

  } catch (error) {
    console.log(error);
    return "Error"
  }
}


function stringToArrayOfBytes(str) {
  const bytes: any = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}