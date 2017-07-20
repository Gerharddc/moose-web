import printerSocket from '../PrinterSocket'

const setFiles = (files) => {
	return {
		type: 'SET_FILES',
		files
	}
};

export function getFiles() {
	return function (dispatch) {
		printerSocket.request({
			request: 'GetFiles',
			data: { }
		}).then(resp => {
			dispatch(setFiles(resp))
		}).catch(resp => {
			console.log('Error getting files: ' + resp);
		});
	}
}

const setPrinting = (printing) => {
	return {
		type: 'SET_PRINTING',
		printing
	}
};

export function getPrinting() {
	return function (dispatch) {
		printerSocket.request({
			request: 'GetPrinting',
			data: { }
		}).then(resp => {
			dispatch(setPrinting(resp))
		}).catch(resp => {
			console.log('Error getting printing: ' + resp);
		});
	}
}

const setPaused = (paused) => {
	return {
		type: 'SET_PAUSED',
		paused
	}
};

export function getPaused() {
	return function (dispatch) {
		printerSocket.request({
			request: 'GetPaused',
			data: { }
		}).then(resp => {
			dispatch(setPaused(resp))
		}).catch(resp => {
			console.log('Error getting paused: ' + resp);
		});
	}
}

const setProgress = (progress) => {
	return {
		type: 'SET_PROGRESS',
		progress
	}
};

export function getProgress() {
	return function (dispatch) {
		printerSocket.request({
			request: 'GetProgress',
			data: { }
		}).then(resp => {
			dispatch(setProgress(resp))
		}).catch(resp => {
			console.log('Error getting progress: ' + resp);
		});
	}
}

const setETA = (eta) => {
	return {
		type: 'SET_ETA',
		eta
	}
};

export function getETA() {
	return function (dispatch) {
		printerSocket.request({
			request: 'GetETA',
			eta: { }
		}).then(resp => {
			dispatch(setETA(resp))
		}).catch(resp => {
			console.log('Error getting eta: ' + resp);
		});
	}
}

export const selectFile = (file) => {
	return {
		type: 'SET_SELECTED_FILE',
		file
	}
};

/* On submit request error, reload with fresh value from server */