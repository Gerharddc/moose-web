import * as HeaterActions from "./actions/heaters"
import * as WifiActions from "./actions/wifi"

let socket = new WebSocket("ws://localhost:8080");
//let socket = new WebSocket("ws://10.42.0.146:8080");
let requestMap = new Map();
let store;
let runOnOpenFunc;

export default class PrinterSocket {
	static get connected() {
		return (socket.readyState === 1);
	}

	static setStore(Store) {
		store = Store;
	}

	static runOnOpen(func) {
		if (socket.readyState === 1) {
			func();
		}
		else {
			runOnOpenFunc = func;
		}
	}

	// Send a formatted request to the server
	// with the ability to handle a response async
	static request(data) {
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

socket.onerror = function (event) {
	alert("Error connecting to printer");
	console.log(event);
};

socket.onopen = function (event) {
	if (runOnOpenFunc !== undefined) {
		runOnOpenFunc();
	}
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
					case 'ConnectionState':
						store.dispatch(WifiActions.getConnectionState());
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

        if (!msg.hasOwnProperty('response')) {
            alert('Invalid message from server');
            console.log('Response lacks response field: ' + event.data);
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
        }
        else {
            alert('Invalid message from server');
            console.log('Unknown status: ' + event.data);
        }

        requestMap.delete(msg.id)
	}
};