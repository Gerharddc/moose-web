// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import ManualControlPanel from './components/ManualControlPanel';
import PrintInfoPanel from './components/PrintInfoPanel';
import WifiPanel from './components/WifiPanel';
import FilesPanel from './components/FilesPanel';
import Heaters from './components/Heaters';
//import CameraPanel from './components/CameraPanel';
import './App.css';

import logo from './img/logo.svg';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		return (
			<div>
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

				<div className="container maingrid">
					<div className="card-columns">
						<ManualControlPanel />
						<Heaters />
						<WifiPanel />
						<FilesPanel />
						<PrintInfoPanel />
					</div>
				</div>

				<footer className="footer">
					© Gerhard de Clercq
				</footer>
			</div>
		);
	}
}

export default App;
