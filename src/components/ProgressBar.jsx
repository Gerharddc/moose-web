// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';

export default class ProgressBar extends Component {
	render() {
		return (
			<div className="progress progresser">
  			<div className="progress-bar progress-bar-striped progress-bar-animated" 
					role="progressbar" aria-valuenow={this.props.percent} 
					aria-valuemin={0} aria-valuemax={100} 
					style={{width: this.props.percent + '%'}}></div>
			</div>
		);
	}
}