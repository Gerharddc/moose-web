// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SSIDControl from './SSIDControl';
import * as WifiActions from '../actions/wifi';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import printerSocket from '../PrinterSocket';
import WifiPasswordDialog from './WifiPasswordDialog';
import PasswordBox from './PasswordBox';

class WifiPanel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showPass: false,
			password: ""
		}
	}

	NoSSIDS(ssids) {
		if (ssids.length < 1) {
			return (<p>No networks</p>)
		}
	}

	render() {
		const { wifi, actions } = this.props;
		let connectedSelected = false;
		if (wifi.selectedSSID && wifi.connectedSSID) {
			connectedSelected = (wifi.selectedSSID.Name === wifi.connectedSSID.Name);
		}

		return (
			<div className="card">
				<WifiPasswordDialog wifi={wifi} actions={actions} />
				<h3 className="card-header">Wifi</h3>
				<div className="card-block">
					<h4>Available SSIDs:</h4>
					<div className="list-bg">
						<ul className="list-group">
							{wifi.ssids.map(s => (
								<SSIDControl key={s.Name} ssid={s} actions={actions} wifi={wifi}
								/>
							))}
						</ul>
					</div>
					{this.NoSSIDS(wifi.ssids)}
					<div className="btn-group">
						<button type="button" className="btn btn-primary"
							onClick={(e) => actions.scanWifi()}>Scan</button>
						<button type="button" className="btn btn-success"
							disabled={!(wifi.selectedSSID) || connectedSelected}
							onClick={(e) => {
								if (wifi.selectedSSID.Secured) {
									actions.setAskPassword(true)
								} else {
									actions.connectSSID(wifi.selectedSSID, "")
								}
							}}>Connect</button>
						<button type="button" className="btn btn-danger"
							disabled={!(wifi.connected) || !connectedSelected}
							onClick={(e) => actions.disconnectWifi()}>Disconnect</button>
					</div>
					<br /><br />
					<h4>Hosting options:</h4>
					<div className="form-group">
						<label className="control-label">SSID</label>
						<input className="form-control" type="text"
							value={wifi.hostingSSID}
							onChange={(event) => actions.setHostingSSID(event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="control-label">Password</label>
						<PasswordBox value={wifi.hostingPWD}
							onChange={(pwd) => actions.setHostingPassphrase(pwd)} />
					</div>
					<div className="row vertcenter">
						<div className="col-4">
							<button type="button" className="btn btn-primary" disabled={!wifi.hosting}
								onClick={(e) => actions.startHosting(wifi.hostingSSID, wifi.hostingPWD)}>Update</button>
						</div>
						<div className="col">
							<ToggleSwitch checked={wifi.hosting}
								onChange={(event) => {
									if (wifi.hosting) {
										actions.stopHosting();
									} else {
										actions.startHosting(wifi.hostingSSID, wifi.hostingPWD);
									}
								}} />
							{wifi.hosting ? "Hosting" : "Not hosting"}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

WifiPanel.propTypes = {
	wifi: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		wifi: state.wifi
	}
}

function mapDispatchToProps(dispatch) {
	printerSocket.on("opened", () => {
		dispatch(WifiActions.getHosting());
		dispatch(WifiActions.getSSIDS());
		dispatch(WifiActions.getConnectedSSID());
		dispatch(WifiActions.getHostingSSID());
		dispatch(WifiActions.getHostingPassphrase());
		dispatch(WifiActions.getConnected());
	});

	return {
		actions: bindActionCreators(WifiActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WifiPanel)