import printerSocket from '../PrinterSocket'

export function printFile(file) {
	return function (dispatch) {
		printerSocket.request({
			request: 'PrintFile',
			data: { path: file }
		}).catch(resp => {
			console.log('Error printing file: ' + resp);
		});
	}
}

export function pausePrint(file) {
	return function (dispatch) {
		printerSocket.request({
			request: 'PausePrint',
			data: null
		}).catch(resp => {
			console.log('Error pausing: ' + resp);
		});
	}
}

export function resumePrint(file) {
	return function (dispatch) {
		printerSocket.request({
			request: 'ResumePrint',
			data: null
		}).catch(resp => {
			console.log('Error resuming: ' + resp);
		});
	}
}

export function stopPrint(file) {
	return function (dispatch) {
		printerSocket.request({
			request: 'StopPrint',
			data: null
		}).catch(resp => {
			console.log('Error stop: ' + resp);
		});
	}
}


/* On submit request error, reload with fresh value from server */