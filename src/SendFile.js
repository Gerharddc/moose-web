import LineNavigator from "line-navigator";

let notifyCanSend = null;
let navigator = null;
let socket = null;

function waitCanSend() {
    return new Promise((resolve, reject) => {
        notifyCanSend = resolve;
    })
}

async function readSomeLines(err, index, lines, isEof, progress) {
    await waitCanSend();

    for (const line of lines) {
        socket.send(line);
    }

    console.log(progress); 

    if (!isEof) {
        navigator.readSomeLines(index + lines.length, readSomeLines);
    } else {
        notifyCanSend = () => {
            socket = null;
        }

        socket.send("DONE");
    }
}

export default function SendFile(file) {
    navigator = new LineNavigator(file);
    navigator.readSomeLines(0, readSomeLines);

    socket = new WebSocket("ws://10.42.0.146:3000");

    socket.onerror = function (event) {
        //Notify('Error', "Error connecting to printer file server");
        console.log(event);
    };

    socket.onopen = function (event) {
        socket.send(file.name);
    };

    socket.onmessage = function (event) {
        switch (event.data) {
            case "ok":
                if (notifyCanSend) {
                    notifyCanSend();
                }
                break;
        }
    }
}