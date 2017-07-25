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
			data: {}
		}).then(resp => {
			dispatch(setFiles(resp))
		}).catch(resp => {
			console.log('Error getting files: ' + resp);
		});
	}
}

export function deleteFile(file) {
	return function (dispatch) {
		printerSocket.request({
			request: 'DeleteFile',
			data: { path: file }
		}).catch(resp => {
			console.log('Error deleting file: ' + resp);
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
			data: {}
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
			data: {}
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
			data: null
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
			data: null
		}).then(resp => {
			dispatch(setETA(resp))
		}).catch(resp => {
			console.log('Error getting eta: ' + resp);
		});
	}
}

const setFileETA = (fileETA) => {
	return {
		type: 'SET_FILE_ETA',
		fileETA
	}
};

export function getFileETA(file) {
	return function (dispatch) {
		printerSocket.request({
			request: 'GetFileETA',
			data: { file }
		}).then(resp => {
			dispatch(setFileETA(resp))
		}).catch(resp => {
			console.log('Error getting file eta: ' + resp);
		});
	}
}

export function selectFile(file) {
	return function (dispatch) {
		dispatch({
			type: 'SET_SELECTED_FILE',
			file
		})

		dispatch(getFileETA(file));
	}
}

export const setUploading = (uploading) => {
	return {
		type: 'SET_UPLOADING',
		uploading
	}
};

export const setUpProg = (upprog) => {
	return {
		type: 'SET_UPPROG',
		upprog
	}
};

const setProcessing = (processing) => {
	return {
		type: 'SET_PROCESSING',
		processing
	}
};

export function getProcessing() {
	return function (dispatch) {
		printerSocket.request({
			request: 'GetProcessing',
			data: null
		}).then(resp => {
			dispatch(setProcessing(resp))
		}).catch(resp => {
			console.log('Error getting processing: ' + resp);
		});
	}
}

const setProcProg = (procprog) => {
	return {
		type: 'SET_PROCPROG',
		procprog
	}
};

export function getProcProg() {
	return function (dispatch) {
		printerSocket.request({
			request: 'GetProcProg',
			data: null
		}).then(resp => {
			dispatch(setProcProg(resp))
		}).catch(resp => {
			console.log('Error getting procprog: ' + resp);
		});
	}
}

/* On submit request error, reload with fresh value from server */