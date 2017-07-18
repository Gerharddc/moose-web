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
						{wifi.ssids.map(s => (
							<SSIDControl ssid={s} actions={actions}
								selected={s === wifi.defaultSelected}
								connected={s === wifi.connectedSSID}
							/>
						))}
						{this.NoSSIDS(wifi.ssids)}
						<div className="btn-group" role="group" aria-label="Basic example">
							<button type="button" className="btn btn-primary"
								onClick={(e) => actions.scanWifi()}>Scan</button>
							<button type="button" className="btn btn-success"
								onClick={(e) => actions.connectSSID(wifi.selectedSSID)}>Connect</button>
							<button type="button" className="btn btn-danger"
								onClick={(e) => actions.disconnectWifi()}>Disconnect</button>
						</div>
						<br/><br/>
						<h4>Hosting options:</h4>
						<ToggleSwitch checked={wifi.hosting}
							onChange={(event) => actions.setHosting(!wifi.hosting, wifi.hostingSSID, wifi.hostingPWD)} />
						{wifi.hosting ? "Hosting" : "Not hosting"}
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
	});

	return {
		actions: bindActionCreators(WifiActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WifiPanel)