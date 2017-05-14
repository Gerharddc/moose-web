// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import { Col, Panel, ProgressBar, Grid, Row, Button,
ButtonToolbar } from 'react-bootstrap';

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
			<Col xs={6} md={4}>
				<Panel header={(<h3>Print info</h3>)} bsStyle="info">
						<div style={{textAlign: 'left'}}>
								<Row style={{marginBottom: '10px'}}>
									<Col xs={6}><b>Status: </b>{this.state.status}</Col>
									<Col xs={6}><b>ETA: </b>{this.state.eta}</Col>
								</Row>
								<ProgressBar now={this.props.progress}/>
								<ButtonToolbar>
									<Button bsStyle="success">Start</Button>
									<Button bsStyle="danger">Stop</Button>
								</ButtonToolbar>
						</div>
				</Panel>
			</Col>
		);
	}
}