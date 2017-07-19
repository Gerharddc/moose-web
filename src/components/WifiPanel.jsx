// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SSIDControl from './SSIDControl';
import * as WifiActions from '../actions/wifi';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import printerSocket from '../PrinterSocket';

class WifiPanel extends Component {
	NoSSIDS(ssids) {
		if (ssids.length < 1) {
			return (<p>No networks</p>)
		}
	}

	render() {
		const { wifi, actions } = this.props;

		return (
			<div className="col col-xs-6 col-md-4">
				<div className="card">
					<h3 className="card-header">Wifi</h3>
					<div className="card-block">
						<h4>Available SSIDs:</h4>
						<div className="list-bg">
							<ul className="list-group">
								{wifi.ssids.map(s => (
									<SSIDControl ssid={s} actions={actions}
										selected={s === wifi.selectedSSID}
										connected={s === wifi.connectedSSID}
									/>
								))}
							</ul>
						</div>
						{this.NoSSIDS(wifi.ssids)}
						<div className="btn-group" role="group" aria-label="Basic example">
							<button type="button" className="btn btn-primary"
								onClick={(e) => actions.scanWifi()}>Scan</button>
							<button type="button" className="btn btn-success"
								onClick={(e) => actions.connectSSID(wifi.selectedSSID)}>Connect</button>
							<button type="button" className="btn btn-danger"
								onClick={(e) => actions.disconnectWifi()}>Disconnect</button>
						</div>
						<br /><br />
						<h4>Hosting options:</h4>
						<div className="form-group">
							<label className="control-label" for="ssidInput">SSID</label>
							<input className="form-control" id="ssidInput" type="text"
								value={wifi.hostingSSID}
								onChange={(event) => actions.setHostingtSSID(event.target.value)}
							/>
						</div>
						<div className="form-group">
							<label className="control-label" for="pwdInput">Password</label>
							<input className="form-control" id="pwdInput" type="password"
								value={wifi.hostingPWD}
								onChange={(event) => actions.setHostingtPWD(event.target.value)}
							/>
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
	});

	return {
		actions: bindActionCreators(WifiActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WifiPanel)