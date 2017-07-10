const wifi = (state = {ssids: []}, action) => {
    switch (action.type) {
        case 'SET_SSIDS':
            return Object.assign({}, state, {
                ssids: action.ssids
            });

        default:
            return state
    }
};

export default wifi;