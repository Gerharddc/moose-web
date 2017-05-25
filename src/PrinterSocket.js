import * as HeaterActions from "./actions/heaters"

let socket = new WebSocket("ws://localhost:8080");
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

            // Check if there is an outstanding request
            if (requestMap.has(data.request)) {
                reject("outstanding");
                return;
            }

            requestMap.set(data.request, { resolve, reject });

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
}

socket.onmessage = function (event) {
    console.log("Got: " + event.data);

    var msg = JSON.parse(event.data);

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

        switch (msg.systemname) {
            case 'Heater':
                switch (msg.property) {
                    case 'TargetTemp':
                        HeaterActions.setTargetTemp(msg.id)
                        break;
                    case 'Heating':
                        break;
                    default:
                        console.log('Unkown property: ' + event.data);
                }
                break;
            default:
                console.log('Unknown subsystem: ' + event.data);
        }
    }
    else {
        if (!msg.hasOwnProperty('request')) {
            alert('Invalid message from server');
            console.log('Response lacks request: ' + event.data);
            return;
        }

        if (!requestMap.has(msg.request)) {
            return;
        }

        if (msg.status === 'success') {
            requestMap.get(msg.request).resolve(msg);
        }
        else if (msg.status === 'error') {
            // TODO: pass error
            requestMap.get(msg.request).reject();
        }
        else {
            alert('Invalid message from server');
            console.log('Unknown status: ' + event.data);
        }

        requestMap.delete(msg.request)
    }
};