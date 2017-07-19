import printerSocket from '../PrinterSocket'

export function scanWifi() {
    return function (dispatch) {
        // TODO: notify scanning with state

        printerSocket.request({
            request: 'ScanWifi',
            data: null
        }).then(resp => {
            dispatch(getSSIDS());
        }).catch(resp => {
            console.log('Error scanning wifi: ' + resp);
        })
    }
}

export function getSSIDS() {
    return function (dispatch) {
        printerSocket.request({
            request: 'GetSSIDS',
            data: null
        }).then(response => {
            dispatch({
                type: 'SET_SSIDS',
                ssids: response
            });
        }).catch(msg => {
            console.log('Error getting ssids: ' + msg);
        })
    }
}

export function getConnectedSSID() {
    return function (dispatch) {
        printerSocket.request({
            request: 'GetConnectedSSID',
            data: null
        }).then(response => {
            dispatch({
                type: 'SET_CONNECTED_SSID',
                ssid: response
            })
        }).catch(msg => {
            console.log('Error getting connected ssid: ' + msg);
        })
    }
}

export function getConnectionState() {
    return function (dispatch) {
        printerSocket.request({
            request: 'GetConnectionState',
            data: null
        }).then(response => {
            dispatch({
                type: 'SET_CONNECTION_STATE',
                state: response
            })
        }).catch(msg => {
            console.log('Error getting connection state: ' + msg);
        })
    }
}

export function connectSSID(ssid) {
    return function (dispatch) {
        if (ssid) {
            printerSocket.request({
                request: 'ConnectSSID',
                data: { ssid }
            }).catch(msg => {
                console.log('Error connecting to ssid: ' + msg);
            })
        }
    }
}

export function disconnectWifi() {
    return function (dispatch) {
        printerSocket.request({
            request: 'DisconnectWifi',
            data: null
        }).catch(msg => {
            console.log('Error disconnecting from wifi: ' + msg);
        })
    }
}

export const selectSSID = (ssid) => {
    return {
        type: 'SET_SELECTED_SSID',
        ssid
    }
};

export const setHostingSSID = (ssid) => {
    return {
        type: 'SET_HOSTING_SSID',
        ssid
    }
};

export function getHostingSSID() {
    return function (dispatch) {
        printerSocket.request({
            request: 'GetHostingSSID',
            data: null
        }).then(response => {
            dispatch(setHostingSSID(response));
        }).catch(msg => {
            console.log('Error getting hostingssid: ' + msg);
        })
    }
}

export const setHostingPassphrase = (pwd) => {
    return {
        type: 'SET_HOSTING_PWD',
        pwd
    }
};

export function getHostingPassphrase() {
    return function (dispatch) {
        printerSocket.request({
            request: 'GetHostingPWD',
            data: null
        }).then(response => {
            dispatch(setHostingPassphrase(response));
        }).catch(msg => {
            console.log('Error getting hostingpwd: ' + msg);
        })
    }
}

export const setHosting = (hosting) => {
    return {
        type: 'SET_HOSTING',
        hosting
    }
}

export function startHosting(ssid, pwd) {
    return function (dispatch) {
        dispatch({
            type: 'SET_HOSTING',
            hosting: true
        })

        printerSocket.request({
            request: 'StartHosting',
            data: {
                ssid,
                pwd
            }
        }).catch(msg => {
            console.log('Error setting hosting: ' + msg);
            getConnectionState(dispatch);
        })
    }
}

export function stopHosting() {
    return function (dispatch) {
        dispatch({
            type: 'SET_HOSTING',
            hosting: false
        })

        printerSocket.request({
            request: 'StopHosting',
            data: null
        }).catch(msg => {
            console.log('Error setting hosting: ' + msg);
            getConnectionState(dispatch);
        })
    }
}

export function getHosting() {
    return function (dispatch) {
        console.log('Getting hosting');

        printerSocket.request({
            request: 'GetHosting',
            data: null
        }).then(response => {
            dispatch({
                type: 'SET_HOSTING',
                hosting: response
            })
        }).catch(msg => {
            console.log('Error getting hosting: ' + msg);
        })
    }
}

/*export const setWifiEnable = (enabled) => {
    return {
        type: 'SET_HOSTING_PWD',
        enabled
    }
    // todo: function
};*/


/* On submit request error, reload with fresh value from server */