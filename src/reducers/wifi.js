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
        case 'SET_CONNECTION_STATE':
            return Object.assign({}, state, {
                connectionState: action.state
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

        default:
            return state
    }
};

export default wifi;