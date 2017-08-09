// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FileActions from '../actions/files';
import printerSocket from '../PrinterSocket';
import FileControl from './FileControl'
import { Notify } from '../notify';
import { ServerAddr } from '../env';;

class FilesPanel extends Component {
	NoFiles(files) {
		if (files.length < 1) {
			return (<p>There are currently no files on the device</p>)
		}
	}

	title(files) {
		if (files.uploading) {
			return `Uploading (${files.upprog}%)`;
		} else if (files.processing) {
			return `Processing (${files.procprog}%)`;
		} else {
			return "Files";
		}
	}

	render() {
		const { files, actions } = this.props;

		return (
			<div className="card grid-item">
				<h3 className="card-header">{ this.title(files) }</h3>
				<div className="card-block" onClick={(e) => actions.selectFile(null)}>
					<div className="list-bg">
						<ul className="list-group">
							{files.files.map(f => (
								<FileControl key={f} file={f} actions={actions} files={files} />
							))}
						</ul>
					</div>
					{this.NoFiles(files.files)}
					<div className="btn-group" role="group" aria-label="Basic example">
						<button type="button" className="btn btn-primary"
							onClick={(e) => {
								e.stopPropagation();
								this.fileInput.click();
							}}
							disabled={files.uploading}>
							Upload
						</button>
						<button type="button" className="btn btn-danger"
							onClick={(e) => {
								actions.deleteFile(files.selectedFile);
								e.stopPropagation();
							}}
							disabled={!(files.selectedFile)}>
							Delete
						</button>
					</div>
					<input type="file" className="hidden" multiple={true}
						ref={(input) => { this.fileInput = input }}
						accept=".gcode"
						onChange={(event) => {
							const files = this.fileInput.files;
							if (files.length > 0) {
								const formData = new FormData();

								let xhr = new XMLHttpRequest();
								if (files.length > 1) {
									for (const file of files) {
										formData.append('gcodes', file, file.name);
									}
									xhr.open('POST', "http://" + ServerAddr + ":3000/uploads", true);
								} else {
									const file = this.fileInput.files[0];
									formData.append('gcode', file, file.name);
									xhr.open('POST', "http://" + ServerAddr + ":3000/upload", true);
								}

								
								xhr.onload = () => {
									if (xhr.status === 200) {
										console.log('success')
									} else {
										Notify("Error", xhr.response)
									}

									actions.setUploading(false);
								}

								xhr.upload.onloadend = () => {
									actions.setUploading(false);
								}

								xhr.upload.onprogress = (e) => {
									actions.setUpProg(Math.round(e.loaded / e.total * 100))
								}

								actions.setUploading(true);
								xhr.send(formData);
							} else {
								console.log('no files')
							}
						}} />
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
		dispatch(FileActions.getProcessing());
		dispatch(FileActions.getProcProg());
	});

	return {
		actions: bindActionCreators(FileActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilesPanel)