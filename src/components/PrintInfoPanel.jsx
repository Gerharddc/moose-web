// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FileActions from '../actions/files';
import * as PrinterActions from '../actions/printer';
import printerSocket from '../PrinterSocket';
import ProgressBar from './ProgressBar'

class PrintInfoPanel extends Component {
	render() {
		const { files, pactions, actions } = this.props;

		return (
			<div className="col col-xs-6 col-md-4">
				<div className="card">
					<h3 className="card-header">Print info</h3>
					<div className="card-block">
						<p className="card-text"><b>Status: </b>
							{files.printing ? "Printing" : "Waiting"}
						</p>
						<p className="card-text"><b>ETA: </b>{files.eta}</p>
						<p>
							<ProgressBar percent={files.progress} />
						</p>
						<div className="btn-group" role="group" aria-label="Basic example">
							<button type="button" className="btn btn-success"
								onClick={(e) => pactions.printFile(files.selectedFile)}
								disabled={(files.selectedFile)}>Start</button>
							<button type="button" className="btn btn-danger"
								onClick={(e) => pactions.stopPrint()}
								disabled={false}>Stop</button>
							<button type="button" className="btn btn-primary">Pause</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

PrintInfoPanel.propTypes = {
	files: PropTypes.object.isRequired,
	pactions: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		files: state.files
	}
}

function mapDispatchToProps(dispatch) {
	printerSocket.on("opened", () => {
		dispatch(FileActions.getETA());
		dispatch(FileActions.getPaused());
		dispatch(FileActions.getPrinting());
		dispatch(FileActions.getProgress());
	});

	return {
		actions: bindActionCreators(FileActions, dispatch),
		pactions: bindActionCreators(PrinterActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PrintInfoPanel)