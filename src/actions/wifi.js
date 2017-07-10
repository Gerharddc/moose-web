import PrinterSocket from '../PrinterSocket'

export function scanWifi() {
	return function (dispatch) {
		// TODO: notify scanning with state

		PrinterSocket.request({
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
		PrinterSocket.request({
			request: 'GetSSIDS',
			data: null
		}).then(response => {
			response.forEach(ssid => {
				dispatch({
					type: 'SET_SSIDS',
					ssids: response
				});
			})
		}).catch(msg => {
			console.log('Error getting ssids: ' + msg);
		});
	}
}

/* On submit request error, reload with fresh value from server */