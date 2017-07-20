import * as HeaterActions from "./actions/heaters";
import * as WifiActions from "./actions/wifi";
import EventEmitter from "event-emitter-es6";

//let socket = new WebSocket("ws://localhost:8080");
let socket = new WebSocket("ws://10.42.0.146:8080");
//let socket = new WebSocket("ws://10.42.0.56:8080");
let requestMap = new Map();
let store;

class PrinterSocket extends EventEmitter {
	get connected() {
		return (socket.readyState === 1);
	}

	setStore(Store) {
		store = Store;
	}

	// Send a formatted request to the server
	// with the ability to handle a response async
	request(data) {
		return new Promise((resolve, reject) => {
			// Check if we have a connection
			if (socket.readyState !== 1) {
				reject("not connected");
				return;
			}

			// We can only process properly formatted request objects
			if (!data.hasOwnProperty('request')) {
				reject("invalid");
				return;
			}

			// Send a random id to trace the response
			let id = Math.random();
			while (requestMap.has(id)) {
				id = Math.random();
			}

			data['id'] = id;

			requestMap.set(id, { resolve, reject });

			socket.send(JSON.stringify(data));
		})
	}
}

const printerSocket = new PrinterSocket();
export default printerSocket;

socket.onerror = function (event) {
	alert("Error connecting to printer");
	console.log(event);
};

socket.onopen = function (event) {
	printerSocket.emit("opened");
};

socket.onmessage = function (event) {
	console.log("Got: " + event.data);

	let msg = JSON.parse(event.data);

	// Only process properly formatted responses
	if (!msg.hasOwnProperty('status')) {
		alert('Invalid message from server');
		console.log('Response lacks status: ' + event.data);
		return;
	}

	// Check if this is a notification or a response
	if (msg.status === 'notify') {
		// Make sure we have a store to modify
		if (store === undefined) {
			console.log('Store unset for PrinterSocket');
			return;
		}
		console.log(msg);

		switch (msg.systemname) {
			case 'Heater':
				switch (msg.property) {
					case 'TargetTemp':
						HeaterActions.getTargetTemp(msg.id)
						break;
					case 'Heating':
						console.log('Heating notify');
						store.dispatch(HeaterActions.getHeating(parseInt(msg.id)));
						break;
					default:
						console.log('Unkown property: ' + event.data);
				}
				break;
			case 'Wifi':
				switch (msg.property) {
					case 'ConnectedSSID':
						store.dispatch(WifiActions.getConnectedSSID());
						break;
					case 'Connected':
						store.dispatch(WifiActions.getConnected());
						break;
					case 'Hosting':
						store.dispatch(WifiActions.getHosting());
						break;
					case 'HostingSSID':
						store.dispatch(WifiActions.getHostingSSID());
						break;
					case 'HostingPWD':
						store.dispatch(WifiActions.getHostingPassphrase());
						break;
					case 'SSIDS':
						store.dispatch(WifiActions.getSSIDS());
						break;
				}
				break;
			default:
				console.log('Unknown subsystem: ' + event.data);
		}
	}
	else {
        if (!msg.hasOwnProperty('id')) {
            alert('Invalid message from server');
            console.log('Response lacks id: ' + event.data);
            return;
        }

        let id = parseFloat(msg.id);

        if (!requestMap.has(id)) {
            console.log('Unkown request id: ' + id);
            return;
        }

        if (msg.status === 'success') {
            requestMap.get(id).resolve(msg.response);
        }
        else if (msg.status === 'error') {
            // TODO: pass error
			requestMap.get(id).reject();
			alert("Printer error: " + msg.error);
        }
        else {
            alert('Invalid message from server');
            console.log('Unknown status: ' + event.data);
        }

        requestMap.delete(msg.id)
	}
};