const files = (state = { files: [] }, action) => {
	switch (action.type) {
		case 'SET_FILES':
			return Object.assign({}, state, {
				files: action.files
      });
    case 'SET_SELECTED_FILE':
			return Object.assign({}, state, {
				selectedFile: action.file
      });
    case 'SET_PRINTING':
			return Object.assign({}, state, {
				printing: action.printing
			});
		case 'SET_PAUSED':
			return Object.assign({}, state, {
				printing: action.paused
      });
    case 'SET_PROGRESS':
			return Object.assign({}, state, {
				progress: action.progress
      });
    case 'SET_ETA':
			return Object.assign({}, state, {
				eta: action.eta
			});
		case 'SET_FILE_ETA':
			return Object.assign({}, state, {
				fileETA: action.fileETA
			});
		case 'SET_UPLOADING':
			return Object.assign({}, state, {
				uploading: action.uploading
			});
		case 'SET_UPPROG':
			return Object.assign({}, state, {
				upprog: action.upprog
			});
		case 'SET_PROCESSING':
			return Object.assign({}, state, {
				processing: action.processing
			});
		case 'SET_PROCPROG':
			return Object.assign({}, state, {
				procprog: action.procprog
			});

		default:
			return state
	}
};

export default files;