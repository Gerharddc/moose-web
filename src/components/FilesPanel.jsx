// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FileActions from '../actions/files';
import printerSocket from '../PrinterSocket';
import FileControl from './FileControl'

class FilesPanel extends Component {
  NoFiles(files) {
		if (files.length < 1) {
			return (<p>There are currently no files on the device</p>)
		}
	}

	render() {
		const { files, actions } = this.props;

		return (
			<div className="col col-xs-6 col-md-4">
				<div className="card">
					<h3 className="card-header">Files</h3>
					<div className="card-block">
            <div className="list-bg">
							<ul className="list-group">
								{files.files.map(f => (
									<FileControl file={f} actions={actions} files={files}/>
								))}
							</ul>
						</div>
            {this.NoFiles(files.files)}
					</div>
				</div>
			</div>
		)
	}
}

FilesPanel.propTypes = {
	files: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		files: state.files
	}
}

function mapDispatchToProps(dispatch) {
  printerSocket.on("opened", () => {
		dispatch(FileActions.getFiles());
	});

	return {
		actions: bindActionCreators(FileActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilesPanel)