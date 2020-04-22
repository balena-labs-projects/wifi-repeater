/*
 * Copyright 2020 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class NetworkManagerTypes {
	/**
	 * NMCapability
	 * NOTE: The range 0x7000 - 0x7FFF of capabilities is guaranteed
	 * not to be used by upstream NetworkManager.
	 * It could thus be used for downstream extensions.
	 * @enum {Number}
	 */
	static CAPABILITY = {
		// Teams can be managed
		TEAM: 1,
	};

	/**
	 * NMState
	 * @enum {Number}
	 */
	static STATE = {
		/**
		 * Networking state is unknown;
		 * Indicates a daemon error
		 */
		UNKNOWN: 0,
		/**
		 * Networking is not enabled;
		 * System is being suspended or resumed
		 */
		ASLEEP: 10,
		/**
		 * No active network connection
		 */
		DISCONNECTED: 20,
		/**
		 * Network connections are being cleaned up;
		 * Applications should tear down their network sessions
		 */
		DISCONNECTING: 30,
		/**
		 * Network connection is being started
		 */
		CONNECTING: 40,
		/**
		 * Only local IPv4 and/or IPv6 connectivity,
		 * but no default route to access the Internet
		 */
		CONNECTED_LOCAL: 50,
		/**
		 * Only site-wide IPv4 and/or IPv6 connectivity;
		 * Means a default route is available,
		 * but the Internet connectivity check did not succeed
		 */
		CONNECTED_SITE: 60,
		/**
		 * Global IPv4 and/or IPv6 Internet connectivity
		 */
		CONNECTED_GLOBAL: 70,
	};

	/**
	 * NMConnectivityState
	 * @enum {Number}
	 */
	static CONNECTIVITY = {
		/**
		 * Network connectivity is unknown;
		 * Connectivity checks disabled, or not run yet
		 */
		UNKNOWN: 0,
		/**
		 * Host is not connected to any network
		 */
		NONE: 1,
		/**
		 * Internet connection is hijacked by a captive portal gateway
		 */
		PORTAL: 2,
		/**
		 * Host is connected to a network,
		 * not able to reach the full Internet,
		 * but a captive portal has not been detected
		 */
		LIMITED: 3,
		/**
		 * Host is connected to a network,
		 * and able to reach the full Internet
		 */
		FULL: 4,
	};

	/**
	 * NMDeviceType
	 * @enum {Number}
	 */
	static DEVICE_TYPE = {
		/** Unknown device */
		UNKNOWN: 0,
		/** Generic support for unrecognized device types */
		GENERIC: 14,
		/** A wired ethernet device */
		ETHERNET: 1,
		/** An 802.11 WiFi device */
		WIFI: 2,
		/** Not used */
		UNUSED1: 3,
		/** Not used */
		UNUSED2: 4,
		/** A Bluetooth device supporting PAN or DUN access protocols */
		BT: 5,
		/** An OLPC XO mesh networking device */
		OLPC_MESH: 6,
		/** An 802.16e Mobile WiMAX broadband device */
		WIMAX: 7,
		/**
		 * A modem supporting analog telephone,
		 * CDMA/EVDO, GSM/UMTS, or LTE network access protocols
		 */
		MODEM: 8,
		/** An IP-over-InfiniBand device */
		INFINIBAND: 9,
		/** A bond master interface */
		BOND: 10,
		/** An 802.1Q VLAN interface */
		VLAN: 11,
		/** ADSL modem */
		ADSL: 12,
		/** A bridge master interface */
		BRIDGE: 13,
		/** A team master interface */
		TEAM: 15,
		/** A TUN or TAP interface */
		TUN: 16,
		/** A IP tunnel interface */
		IP_TUNNEL: 17,
		/** A MACVLAN interface */
		MACVLAN: 18,
		/** A VXLAN interface */
		VXLAN: 19,
		/** A VETH interface */
		VETH: 20,
		/** A MACsec interface */
		MACSEC: 21,
		/** A dummy interface */
		DUMMY: 22,
		/** A PPP interface */
		PPP: 23,
		/** A OpenVSwitch interface */
		OVS_INTERFACE: 24,
		/** A OpenVSwitch port */
		OVS_PORT: 25,
		/** A OpenVSwitch bridge */
		OVS_BRIDGE: 26,
	};

	/**
	 * NMDeviceCapabilities
	 * @enum {Number}
	 */
	static DEVICE_CAP = {
		/** Device has no special capabilities */
		NONE: 0x00000000,
		/** NetworkManager supports this device */
		NM_SUPPORTED: 0x00000001,
		/** This device can indicate carrier status */
		CARRIER_DETECT: 0x00000002,
		/** This device is a software device */
		IS_SOFTWARE: 0x00000003,
		/** This device supports single-root I/O virtualization */
		SRIOV: 0x00000004,
	};

	/**
	 * NMDeviceWifiCapabilities
	 * @enum {Number}
	 */
	static WIFI_DEVICE_CAP = {
		/** Device has no encryption/authentication capabilities */
		NONE: 0x00000000,
		/** Device supports 40/64-bit WEP encryption */
		CIPHER_WEP40: 0x00000001,
		/** Device supports 104/128-bit WEP encryption */
		CIPHER_WEP104: 0x00000002,
		/** Device supports TKIP encryption */
		CIPHER_TKIP: 0x00000004,
		/** Device supports AES/CCMP encryption */
		CIPHER_CCMP: 0x00000008,
		/** Device supports WPA1 authentication */
		WPA: 0x00000010,
		/** Device supports WPA2/RSN authentication */
		RSN: 0x00000020,
		/** Device supports Access Point mode */
		AP: 0x00000040,
		/** Device supports Ad-Hoc mode */
		ADHOC: 0x00000080,
		/** Device reports frequency capabilities */
		FREQ_VALID: 0x00000100,
		/** Device supports 2.4GHz frequencies */
		FREQ_2GHZ: 0x00000200,
		/** Device supports 5GHz frequencies */
		FREQ_5GHZ: 0x00000400,
	};

	/**
	 * NM80211ApFlags
	 * @enum {Number}
	 */
	static AP_802_11S = {
		/** Access point has no special capabilities */
		NONE: 0x00000000,
		/** Access point requires authentication and encryption (usually means WEP) */
		PRIVACY: 0x00000001,
		/** Access point supports some WPS method */
		WPS: 0x00000002,
		/** Access point supports push-button WPS */
		WPS_PBC: 0x00000004,
		/** Access point supports PIN-based WPS */
		WPS_PIN: 0x00000008,
	};

	/**
	 * NM80211ApSecurityFlags
	 * @enum {Number}
	 * @description current security requirements of an
	 * access point as determined from the access point's beacon
	 */
	static AP_802_11_SEC = {
		/** The access point has no special security requirements */
		NONE: 0x00000000,
		/** 40/64-bit WEP is supported for pairwise/unicast encryption */
		PAIR_WEP40: 0x00000001,
		/** 104/128-bit WEP is supported for pairwise/unicast encryption */
		PAIR_WEP104: 0x00000002,
		/** TKIP is supported for pairwise/unicast encryption */
		PAIR_TKIP: 0x00000004,
		/** AES/CCMP is supported for pairwise/unicast encryption */
		PAIR_CCMP: 0x00000008,
		/** 40/64-bit WEP is supported for group/broadcast encryption */
		GROUP_WEP40: 0x00000010,
		/** 104/128-bit WEP is supported for group/broadcast encryption */
		GROUP_WEP104: 0x00000020,
		/** TKIP is supported for group/broadcast encryption */
		GROUP_TKIP: 0x00000040,
		/** AES/CCMP is supported for group/broadcast encryption */
		GROUP_CCMP: 0x00000080,
		/** WPA/RSN Pre-Shared Key encryption is supported */
		KEY_MGMT_PSK: 0x00000100,
		/** 802.1x authentication and key management is supported */
		KEY_MGMT_802_1X: 0x00000200,
	};

	/**
	 * NM80211Mode
	 * @enum {Number}
	 * @description 802.11 mode an access point or device is currently in
	 */
	static MODE_802_11 = {
		/** The device or access point mode is unknown */
		UNKNOWN: 0,
		/**
		 * For both devices and access point objects,
		 * indicates the object is part of an Ad-Hoc 802.11 network
		 * without a central coordinating access point.
		 */
		ADHOC: 1,
		/**
		 * The device or access point is in infrastructure mode.
		 * For devices, this indicates the device is an 802.11 client/station.
		 * For access point objects, this indicates the object is an access point
		 * that provides connectivity to clients.
		 */
		INFRA: 2,
		/**
		 * The device is an access point/hotspot.
		 * Not valid for access point objects;
		 * used only for hotspot mode on the local machine.
		 */
		AP: 3,
	};

	/**
	 * NMBluetoothCapabilities
	 * @enum {Number}
	 * @description Usable capabilities of a Bluetooth device
	 */
	static BT_CAPABILITY = {
		/** Device has no usable capabilities */
		NONE: 0x00000000,
		/** Device provides Dial-Up Networking capability */
		DUN: 0x00000001,
		/** Device provides Network Access Point capability */
		NAP: 0x00000002,
	};

	/**
	 * NMDeviceModemCapabilities
	 * @enum {Number}
	 * @description Radio access technology families a modem device supports.
	 * For more information on the specific access technologies
	 * the device supports use the ModemManager D-Bus API
	 */
	static DEVICE_MODEM_CAPABILITY = {
		/** Modem has no usable capabilities */
		NONE: 0x00000000,
		/** Modem uses the analog wired telephone network and is not a wireless/cellular device */
		POTS: 0x00000001,
		/** Modem supports at least one of CDMA 1xRTT, EVDO revision 0, EVDO revision A, or EVDO revision B */
		CDMA_EVDO: 0x00000002,
		/** Modem supports at least one of GSM, GPRS, EDGE, UMTS, HSDPA, HSUPA, or HSPA+ packet switched data capability */
		GSM_UMTS: 0x00000004,
		/** Modem has LTE data capability */
		LTE: 0x00000008,
	};

	/**
	 * NMWimaxNspNetworkType
	 * @enum {Number}
	 */
	static WIMAX_NSP_NETWORK_TYPE = {
		/** Unknown network type */
		UNKNOWN: 0,
		/** Home network */
		HOME: 1,
		/** Partner network */
		PARTNER: 2,
		/** Roaming partner network */
		ROAMING_PARTNER: 3,
	};

	/**
	 * NMDeviceState
	 * @enum {Number}
	 */
	static DEVICE_STATE = {
		/**
		 * The device's state is unknown
		 * @type {Number}
		 */
		UNKNOWN: 0,
		/**
		 * The device is recognized, but not managed by NetworkManager
		 * @type {Number}
		 */
		UNMANAGED: 10,
		/**
		 * The device is managed by NetworkManager, but is not available for use.
		 * Reasons may include the wireless switched off, missing firmware,
		 * no ethernet carrier, missing supplicant or modem manager, etc.
		 * @type {Number}
		 */
		UNAVAILABLE: 20,
		/**
		 * The device can be activated, but is currently idle and not connected to a network.
		 * @type {Number}
		 */
		DISCONNECTED: 30,
		/**
		 * The device is preparing the connection to the network.
		 * This may include operations like changing the MAC address,
		 * setting physical link properties,
		 * and anything else required to connect to the requested network.
		 * @type {Number}
		 */
		PREPARE: 40,
		/**
		 * The device is connecting to the requested network.
		 * This may include operations like associating with the WiFi AP,
		 * dialing the modem, connecting to the remote Bluetooth device, etc.
		 * @type {Number}
		 */
		CONFIG: 50,
		/**
		 * The device requires more information to continue connecting to the requested network.
		 * This includes secrets like WiFi passphrases, login passwords, PIN codes, etc.
		 * @type {Number}
		 */
		NEED_AUTH: 60,
		/**
		 * The device is requesting IPv4 and/or IPv6 addresses
		 * and routing information from the network.
		 * @type {Number}
		 */
		IP_CONFIG: 70,
		/**
		 * The device is checking whether further action is required for the requested network connection.
		 * This may include checking whether only local network access is available,
		 * whether a captive portal is blocking access to the Internet, etc.
		 * @type {Number}
		 */
		IP_CHECK: 80,
		/**
		 * The device is waiting for a secondary connection (like a VPN)
		 * which must activated before the device can be activated
		 * @type {Number}
		 */
		SECONDARIES: 90,
		/**
		 * The device has a network connection, either local or global.
		 * @type {Number}
		 */
		ACTIVATED: 100,
		/**
		 * A disconnection from the current network connection was requested,
		 * and the device is cleaning up resources used for that connection.
		 * The network connection may still be valid.
		 * @type {Number}
		 */
		DEACTIVATING: 110,
		/**
		 * The device failed to connect to the requested network and
		 * is cleaning up the connection request
		 * @type {Number}
		 */
		FAILED: 120,
	};

	/**
	 * NMDeviceStateReason
	 * @enum {Number}
	 */
	static DEVICE_STATE_REASON = {
		/** No reason given */
		NONE: 0,
		/** Unknown error */
		UNKNOWN: 1,
		/** Device is now managed */
		NOW_MANAGED: 2,
		/** Device is now unmanaged */
		NOW_UNMANAGED: 3,
		/** The device could not be readied for configuration */
		CONFIG_FAILED: 4,
		/** IP configuration could not be reserved (no available address, timeout, etc) */
		IP_CONFIG_UNAVAILABLE: 5,
		/** The IP config is no longer valid */
		IP_CONFIG_EXPIRED: 6,
		/** Secrets were required, but not provided */
		NO_SECRETS: 7,
		/** 802.1x supplicant disconnected */
		SUPPLICANT_DISCONNECT: 8,
		/** 802.1x supplicant configuration failed */
		SUPPLICANT_CONFIG_FAILED: 9,
		/** 802.1x supplicant failed */
		SUPPLICANT_FAILED: 10,
		/** 802.1x supplicant took too long to authenticate */
		SUPPLICANT_TIMEOUT: 11,
		/** PPP service failed to start */
		PPP_START_FAILED: 12,
		/** PPP service disconnected */
		PPP_DISCONNECT: 13,
		/** PPP failed */
		PPP_FAILED: 14,
		/** DHCP client failed to start */
		DHCP_START_FAILED: 15,
		/** DHCP client error */
		DHCP_ERROR: 16,
		/** DHCP client failed */
		DHCP_FAILED: 17,
		/** Shared connection service failed to start */
		SHARED_START_FAILED: 18,
		/** Shared connection service failed */
		SHARED_FAILED: 19,
		/** AutoIP service failed to start */
		AUTOIP_START_FAILED: 20,
		/** AutoIP service error */
		AUTOIP_ERROR: 21,
		/** AutoIP service failed */
		AUTOIP_FAILED: 22,
		/** The line is busy */
		MODEM_BUSY: 23,
		/** No dial tone */
		MODEM_NO_DIAL_TONE: 24,
		/** No carrier could be established */
		MODEM_NO_CARRIER: 25,
		/** The dialing request timed out */
		MODEM_DIAL_TIMEOUT: 26,
		/** The dialing attempt failed */
		MODEM_DIAL_FAILED: 27,
		/** Modem initialization failed */
		MODEM_INIT_FAILED: 28,
		/** Failed to select the specified APN */
		GSM_APN_FAILED: 29,
		/** Not searching for networks */
		GSM_REGISTRATION_NOT_SEARCHING: 30,
		/** Network registration denied */
		GSM_REGISTRATION_DENIED: 31,
		/** Network registration timed out */
		GSM_REGISTRATION_TIMEOUT: 32,
		/** Failed to register with the requested network */
		GSM_REGISTRATION_FAILED: 33,
		/** PIN check failed */
		GSM_PIN_CHECK_FAILED: 34,
		/** Necessary firmware for the device may be missing */
		FIRMWARE_MISSING: 35,
		/** The device was removed */
		REMOVED: 36,
		/** NetworkManager went to sleep */
		SLEEPING: 37,
		/** The device's active connection disappeared */
		CONNECTION_REMOVED: 38,
		/** Device disconnected by user or client */
		USER_REQUESTED: 39,
		/** Carrier/link changed */
		CARRIER: 40,
		/** The device's existing connection was assumed */
		CONNECTION_ASSUMED: 41,
		/** The supplicant is now available */
		SUPPLICANT_AVAILABLE: 42,
		/** The modem could not be found */
		MODEM_NOT_FOUND: 43,
		/** The Bluetooth connection failed or timed out */
		BT_FAILED: 44,
		/** GSM Modem's SIM Card not inserted */
		GSM_SIM_NOT_INSERTED: 45,
		/** GSM Modem's SIM Pin required */
		GSM_SIM_PIN_REQUIRED: 46,
		/** GSM Modem's SIM Puk required */
		GSM_SIM_PUK_REQUIRED: 47,
		/** GSM Modem's SIM wrong */
		GSM_SIM_WRONG: 48,
		/** InfiniBand device does not support connected mode */
		INFINIBAND_MODE: 49,
		/** A dependency of the connection failed */
		DEPENDENCY_FAILED: 50,
		/** Problem with the RFC 2684 Ethernet over ADSL bridge */
		BR2684_FAILED: 51,
		/** ModemManager not running */
		MODEM_MANAGER_UNAVAILABLE: 52,
		/** The WiFi network could not be found */
		SSID_NOT_FOUND: 53,
		/** A secondary connection of the base connection failed */
		SECONDARY_CONNECTION_FAILED: 54,
		/** DCB or FCoE setup failed */
		DCB_FCOE_FAILED: 55,
		/** Teamd control failed */
		TEAMD_CONTROL_FAILED: 56,
		/** Modem failed or no longer available */
		MODEM_FAILED: 57,
		/** Modem now ready and available */
		MODEM_AVAILABLE: 58,
		/** SIM PIN was incorrect */
		SIM_PIN_INCORRECT: 59,
		/** New connection activation was enqueued */
		NEW_ACTIVATION: 60,
		/** The device's parent changed */
		PARENT_CHANGED: 61,
		/** The device parent's management changed */
		PARENT_MANAGED_CHANGED: 62,
		/** Problem communicating with OpenVSwitch database */
		OVSDB_FAILED: 63,
		/** A duplicate IP address was detected */
		IP_ADDRESS_DUPLICATE: 64,
		/** The selected IP method is not supported */
		IP_METHOD_UNSUPPORTED: 65,
	};

	/**
	 * NMMetered
	 * Since: v1.2
	 * @enum {Number}
	 */
	static METERED = {
		/** The metered status is unknown */
		UNKNOWN: 0,
		/** Metered, the value was statically set */
		YES: 1,
		/** Not metered, the value was statically set */
		NO: 2,
		/** Metered, the value was guessed */
		GUESS_YES: 3,
		/** Not metered, the value was guessed */
		GUESS_NO: 4,
	};

	/**
	 * NMActiveConnectionState
	 * NOTE: NMActiveConnectionState values indicate the state of a
	 * connection to a specific network while it is starting,
	 * connected, or disconnecting from that network.
	 * @enum {Number}
	 */
	static ACTIVE_CONNECTION_STATE = {
		/** The state of the connection is unknown */
		UNKNOWN: 0,
		/** A network connection is being prepared */
		ACTIVATING: 1,
		/** There is a connection to the network */
		ACTIVATED: 2,
		/** The network connection is being torn down and cleaned up */
		DEACTIVATING: 3,
		/** The network connection is disconnected and will be removed */
		DEACTIVATED: 4,
	};

	/**
	 * NMActiveConnectionStateReason
	 * Since: v1.8
	 * @enum {Number}
	 */
	static ACTIVE_CONNECTION_STATE_REASON = {
		/**
		 * The reason for the active connection state change is unknown.
		 * @type {Number}
		 */
		UNKNOWN: 0,
		/**
		 * No reason was given for the active connection state change.
		 * @type {Number}
		 */
		NONE: 1,
		/**
		 * The active connection changed state because the user disconnected it.
		 * @type {Number}
		 */
		USER_DISCONNECTED: 2,
		/**
		 * The active connection changed state because the device it was using was disconnected.
		 * @type {Number}
		 */
		DEVICE_DISCONNECTED: 3,
		/**
		 * The service providing the VPN connection was stopped.
		 * @type {Number}
		 */
		SERVICE_STOPPED: 4,
		/**
		 * The IP config of the active connection was invalid.
		 * @type {Number}
		 */
		IP_CONFIG_INVALID: 5,
		/**
		 * The connection attempt to the VPN service timed out.
		 * @type {Number}
		 */
		CONNECT_TIMEOUT: 6,
		/**
		 * A timeout occurred while starting the service providing the VPN connection.
		 * @type {Number}
		 */
		SERVICE_START_TIMEOUT: 7,
		/**
		 * Starting the service providing the VPN connection failed.
		 * @type {Number}
		 */
		SERVICE_START_FAILED: 8,
		/**
		 * Necessary secrets for the connection were not provided.
		 * @type {Number}
		 */
		NO_SECRETS: 9,
		/**
		 * Authentication to the server failed.
		 * @type {Number}
		 */
		LOGIN_FAILED: 10,
		/**
		 * The connection was deleted from settings.
		 * @type {Number}
		 */
		CONNECTION_REMOVED: 11,
		/**
		 * Master connection of this connection failed to activate.
		 * @type {Number}
		 */
		DEPENDENCY_FAILED: 12,
		/**
		 * Could not create the software device link.
		 * @type {Number}
		 */
		DEVICE_REALIZE_FAILED: 13,
		/**
		 * The device this connection depended on disappeared.
		 * @type {Number}
		 */
		DEVICE_REMOVED: 14,
	};

	/**
	 * NMSecretAgentGetSecretsFlags
	 * NOTE: NMSecretAgentGetSecretsFlags values modify the behavior of a GetSecrets request
	 * @enum {Number}
	 */
	static SECRET_AGENT_GET_SECRETS = {
		/**
		 * No special behavior; by default no user interaction is
		 * allowed and requests for secrets are fulfilled from persistent storage,
		 * or if no secrets are available an error is returned.
		 * @type {Number}
		 */
		NONE: 0x0,
		/**
		 * Allows the request to interact with the user,
		 * possibly prompting via UI for secrets if any are required,
		 * or if none are found in persistent storage.
		 * @type {Number}
		 */
		ALLOW_INTERACTION: 0x1,
		/**
		 * Explicitly prompt for new secrets from the user.
		 * This flag signals that NetworkManager thinks any existing secrets are invalid or wrong.
		 * This flag implies that interaction is allowed.
		 * @type {Number}
		 */
		REQUEST_NEW: 0x2,
		/**
		 * Set if the request was initiated by user-requested action via the D-Bus interface,
		 * as opposed to automatically initiated by NetworkManager in response to scan results or carrier changes.
		 * @type {Number}
		 */
		USER_REQUESTED: 0x4,
		/**
		 * Indicates that WPS enrollment is active with PBC method.
		 * The agent may suggest that the user pushes a button on the router instead of supplying a PSK.
		 * @type {Number}
		 */
		WPS_PBC_ACTIVE: 0x8,
		/**
		 * Internal flag, not part of the D-Bus API.
		 * @type {Number}
		 */
		ONLY_SYSTEM: 0x80000000,
		/**
		 * Internal flag, not part of the D-Bus API.
		 * @type {Number}
		 */
		NO_ERRORS: 0x40000000,
	};

	/**
	 * NMSecretAgentCapabilities
	 * NOTE: NMSecretAgentCapabilities indicate various capabilities of the agent
	 * @enum {Number}
	 */
	static SECRET_AGENT_CAPABILITY = {
		/**
		 * The agent supports no special capabilities
		 * @type {Number}
		 */
		NONE: 0x0,
		/**
		 * The agent supports passing hints to VPN plugin authentication dialogs.
		 * @type {Number}
		 */
		VPN_HINTS: 0x1,
	};

	/**
	 * NMIPTunnelMode
	 * Since: v1.2
	 * @enum {Number}
	 */
	static IP_TUNNEL_MODE = {
		/** Unknown/unset tunnel mode */
		UNKNOWN: 0,
		/** IP in IP tunnel */
		IPIP: 1,
		/** GRE tunnel */
		GRE: 2,
		/** SIT tunnel */
		SIT: 3,
		/** ISATAP tunnel */
		ISATAP: 4,
		/** VTI tunnel */
		VTI: 5,
		/** IPv6 in IPv6 tunnel */
		IP6IP6: 6,
		/** IPv4 in IPv6 tunnel */
		IPIP6: 7,
		/** IPv6 GRE tunnel */
		IP6GRE: 8,
		/** IPv6 VTI tunnel */
		VTI6: 9,
	};

	/**
	 * NMCheckpointCreateFlags
	 * Since: v1.4
	 * @enum {Number}
	 */
	static CHECKPOINT_CREATE = {
		/**
		 * No flags
		 * @type {Number}
		 */
		NONE: 0,
		/**
		 * When creating a new checkpoint,
		 * destroy all existing ones.
		 * @type {Number}
		 */
		DESTROY_ALL: 0x01,
		/**
		 * Upon rollback, delete any new connection added after the checkpoint
		 * Since: v1.6
		 * @type {Number}
		 */
		DELETE_NEW_CONNECTIONS: 0x02,
		/**
		 * Upon rollback, disconnect any new device appeared after the checkpoint
		 * Since: v1.6
		 * @type {Number}
		 */
		DISCONNECT_NEW_DEVICES: 0x04,
	};

	/**
	 * NMRollbackResult
	 * Since: v1.4
	 * @enum {Number}
	 */
	static ROLLBACK_RESULT = {
		/** The rollback succeeded. */
		OK: 0,
		/** The device no longer exists. */
		ERR_NO_DEVICE: 1,
		/** The device is now unmanaged. */
		ERR_DEVICE_UNMANAGED: 2,
		/** Other errors during rollback. */
		ERR_FAILED: 3,
	};

	/**
	 * NMActivationStateFlags
	 * Since: v1.10
	 * @enum {Number}
	 */
	static ACTIVATION_STATE = {
		/**
		 * An alias for numeric zero, no flags set.
		 * @type {Number}
		 */
		NONE: 0,
		/**
		 * The device is a master.
		 * @type {Number}
		 */
		IS_MASTER: null, // (1LL
		/**
		 * The device is a slave.
		 * @type {Number}
		 */
		IS_SLAVE: null, // (1LL
		/**
		 * Layer2 is activated and ready.
		 * @type {Number}
		 */
		LAYER2_READY: null, // (1LL
		/**
		 * IPv4 setting is completed.
		 * @type {Number}
		 */
		IP4_READY: null, // (1LL
		/**
		 * IPv6 setting is completed.
		 * @type {Number}
		 */
		IP6_READY: null, // (1LL
		/**
		 * The master has any slave devices attached.
		 * This only makes sense if the device is a master.
		 * @type {Number}
		 */
		MASTER_HAS_SLAVES: null, // (1LL
	};

	/**
	 * NMSettingsUpdate2Flags
	 * Since: v1.10.2
	 * @enum {Number}
	 */
	static SETTINGS_UPDATE2 = {
		/**
		 * An alias for numeric zero, no flags set.
		 * @type {Number}
		 */
		NONE: 0,
		/**
		 * To persist the connection to disk.
		 * @type {Number}
		 */
		TO_DISK: null, // (1LL
		/**
		 * To make the connection in-memory only.
		 * If the connection was previously persistent,
		 * the corresponding file on disk is not deleted but merely the
		 * connection is decoupled from the file on disk.
		 * If you later delete an in-memory connection,
		 * the connection on disk will be deleted as well.
		 * @type {Number}
		 */
		IN_MEMORY: null, // (1LL
		/**
		 * This is like @NM_SETTINGS_UPDATE2_FLAG_IN_MEMORY,
		 * but if the connection has a corresponding file on disk,
		 * the association between the connection and the file is
		 * forgotten but the file is not modified.
		 * The difference to %NM_SETTINGS_UPDATE2_FLAG_IN_MEMORY is if you later
		 * save the connection again to disk, a new file name will be chosen without
		 * overwriting the remaining file on disk.
		 * Also, if you delete the connection later,
		 * the file on disk will not be deleted.
		 * @type {Number}
		 */
		IN_MEMORY_DETACHED: null, // (1LL
		/**
		 * This is like @NM_SETTINGS_UPDATE2_FLAG_IN_MEMORY,
		 * but if the connection has a corresponding file on disk,
		 * the file on disk will be deleted.
		 * @type {Number}
		 */
		IN_MEMORY_ONLY: null, // (1LL
		/**
		 * This can be specified with either %NM_SETTINGS_UPDATE2_FLAG_IN_MEMORY_DETACHED or
		 * %NM_SETTINGS_UPDATE2_FLAG_IN_MEMORY_ONLY. After making the connection in-memory only,
		 * the connection is marked as volatile.
		 * That means, if the connection is currently not active it will be deleted right away.
		 * Otherwise, it is marked to for deletion once the connection deactivates.
		 * A volatile connection cannot autoactivate again (because it's about to be deleted),
		 * but a manual activation will clear the volatile flag.
		 * @type {Number}
		 */
		VOLATILE: null, // (1LL
		/**
		 * Usually, when the connection has autoconnect enabled and is modified,
		 * it becomes elegible to autoconnect right away.
		 * Setting this flag, disables autoconnect until the connection is manually activated.
		 * @type {Number}
		 */
		BLOCK_AUTOCONNECT: null, // (1LL
	};
}