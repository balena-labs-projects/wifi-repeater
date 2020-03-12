import * as Bluebird from "bluebird";
import { systemBus, Message, Bus } from 'dbus-native';

export const dbus: Bus = systemBus();

export const dbusInvoker = (message: Message): PromiseLike<any> => {
	return Bluebird.fromCallback(cb => {
		return dbus.invoke(message, cb);
	});
};

export const getProperty = async (service: string, objectPath: string, objectInterface: string, property: string): Promise<any> => {
	let message: Message = {
		destination: service,
		path: objectPath,
		interface: 'org.freedesktop.DBus.Properties',
		member: 'Get',
		signature: 'ss',
		body: [objectInterface, property] 
	}
	const [[], [value]] = await dbusInvoker(message);
	return value;
};

