// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import ManualControlPanel from './components/ManualControlPanel';
import PrintInfoPanel from './components/PrintInfoPanel';
import WifiPanel from './components/WifiPanel';
import FilesPanel from './components/FilesPanel';
import CameraPanel from './components/CameraPanel';
import './App.css';
import { Register } from './notify';
import NotifyDialog from './components/NotifyDialog';
import Masonry from 'react-masonry-component';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HeaterActions from './actions/heaters';
import HeaterControl from './components/HeaterControl';
import printerSocket from './PrinterSocket';

import logo from './img/logo.svg';

const masonryOptions = {
	itemSelector: '.grid-item',
	columnWidth: '.grid-sizer',
	percentPosition: true,
	gutter: 10
};

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			notification: null
		}

		Register((notification) => {
			this.setState({ notification })
		})
	}

	ShowNotification() {
		if (this.state.notification) {
			return (<NotifyDialog notification={this.state.notification} />)
		}
	}

	Heaters(heaters, files, actions) {
		return (heaters.map(h => (
			<HeaterControl key={h.id} heater={h} actions={actions} files={files}/>
		)));
	}

	render() {
		return (
			<div className="Main">
				<div className="jumbotron vcenter-text">
					<div className="row justify-content-center">
						<div className="col-1 hidden-sm-down" />
						<div className="col col-auto">
							<h1 className="display-3">Moose Printer</h1>
							<p>Because bigger is better!</p>
						</div>
						<div className="col col-md-1 col-auto">
							<img src={logo} className="App-logo" alt="logo" />
						</div>
					</div>
				</div>

				<div className="maingrid">
					<Masonry options={masonryOptions}>
						<div className="grid-sizer"></div>
						<ManualControlPanel />
						<FilesPanel />
						<PrintInfoPanel />
						<WifiPanel />
						{this.Heaters(this.props.heaters, this.props.files, this.props.actions)}
						<CameraPanel />
					</Masonry>
				</div>

				{this.ShowNotification()}

				<footer className="footer">
					© Gerhard de Clercq
				</footer>
			</div>
		);
	}
}

App.propTypes = {
	heaters: PropTypes.array.isRequired,
	files: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		heaters: state.heaters,
		files: state.files
	}
}

function mapDispatchToProps(dispatch) {
	printerSocket.on("opened", () => {
		dispatch(HeaterActions.getHeaters());
	});

	return {
		actions: bindActionCreators(HeaterActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
