// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import ProgressBar from './ProgressBar'

export default class PrintInfoPanel extends Component {
	constructor(props) {
		super(props)
		this.state = {
				status: 'No job',
				progress: 0,
				eta: 'N/A'
		}
	}

	render() {
		return (
			<div className="col col-xs-6 col-md-4">
				<div className="card">
					<h3 className="card-header">Print info</h3>
					<div className="card-block">
						<p className="card-text"><b>Status: </b>{this.state.status}</p>
						<p className="card-text"><b>ETA: </b>{this.state.eta}</p>
						<p>
  						<ProgressBar percent={75}/>
						</p>
						<div className="btn-group" role="group" aria-label="Basic example">
  						<button type="button" className="btn btn-success">Start</button>
  						<button type="button" className="btn btn-danger">Stop</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}