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

        default:
            return state
    }
};

export default wifi;