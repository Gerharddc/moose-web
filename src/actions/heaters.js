import PrinterSocket from '../PrinterSocket'

const setHeatingI = (id, isOn) => {
  return {
    type: 'SET_HEATING',
    id,
    isOn
  }
};

export function getHeating(id) {
    return function (dispatch) {
        PrinterSocket.request({
            request: 'GetHeating',
            data: { id }
        }).then(msg => {
            dispatch(setHeatingI(id, msg.heating))
        }).catch(msg => {
            alert('Error communicating with printer');
            console.log('Error getting heating: ' + msg);
        });
    }
}

export function setHeating(id, heating) {
    return function (dispatch) {
        PrinterSocket.request({
            request: 'SetHeating',
            data: { id, heating }
        }).catch(msg => {
            dispatch(getHeating())
        });

        dispatch(setHeatingI(id, heating));
    }
}

export const setTargetTemp = (id, target) => {
  return {
    type: 'SET_TARGET_TEMP',
    id,
    target
  }
};

export function getHeater(id) {
    return function (dispatch) {
        PrinterSocket.request({
            request: 'GetHeater',
            data: { id: id }
        }).then(msg => {
            dispatch({
                type: 'ADD_HEATER',
                id: id,
                displayName: msg.displayName,
                isOn: msg.isOn,
                target: msg.target,
                current: msg.current
            })
        }).catch(msg => {
            console.log('Error getting heater: ' + msg);
        });
    }
}

export function getHeaters() {
    return function (dispatch) {
        PrinterSocket.request({
            request: 'GetHeaters',
            data: {}
        }).then(msg => {
            msg.heaters.forEach(id => {
                dispatch(getHeater(id));
            })
        }).catch(msg => {
            console.log('Error getting heaters: ' + msg);
        });
    }
}

/* On submit request error, reload with fresh value from server */