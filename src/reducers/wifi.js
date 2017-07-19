const wifi = (state = {ssids: []}, action) => {
    switch (action.type) {
        case 'SET_SSIDS':
            return Object.assign({}, state, {
                ssids: action.ssids
            });
        case 'SET_SELECTED_SSID':
            return Object.assign({}, state, {
                selectedSSID: action.ssid
            });
        case 'SET_CONNECTED_SSID':
            return Object.assign({}, state, {
                connectedSSID: action.ssid
            });
        case 'SET_HOSTING_SSID':
            return Object.assign({}, state, {
                hostingSSID: action.ssid
            });
        case 'SET_HOSTING_PWD':
            return Object.assign({}, state, {
                hostingPWD: action.pwd
            });
        case 'SET_IS_HOSTING':
            return Object.assign({}, state, {
                isHosting: action.isHosting
            });
        case 'SET_HOSTING':
            return Object.assign({}, state, {
                hosting: action.hosting
            });
        case 'SET_CONNECTED':
            return Object.assign({}, state, {
                connected: action.connected
            });
        case 'SET_ASK_PASSWORD':
            return Object.assign({}, state, {
                askPassword: action.askPassword
            });

        default:
            return state
    }
};

export default wifi;