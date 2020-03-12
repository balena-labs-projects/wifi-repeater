declare module 'dbus-native' {

	export type BodyEntry = string | number | array | null;

  export interface Message {
		destination: string;
		path: string;
		interface: string;
		member: string;
		signature?: string;
		body?: BodyEntry[];
	}

	export interface Bus {
		invoke: (
			message: Message,
			callback: (error: Error, response: any) => void,
		) => void;
	}

	export function systemBus(): Bus;

}