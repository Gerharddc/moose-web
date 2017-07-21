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

		default:
			return state
	}
};

export default files;