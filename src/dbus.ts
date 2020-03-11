import * as Bluebird from "bluebird";
import { systemBus, Message } from 'dbus-native';

export const dbus: any = systemBus();

export const dbusInvoker = (message: Message): PromiseLike<any> => {
	return Bluebird.fromCallback(cb => {
		return dbus.invoke(message, cb);
	});
};