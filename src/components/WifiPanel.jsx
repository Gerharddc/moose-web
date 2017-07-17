// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SSIDControl from './SSIDControl';
import * as WifiActions from '../actions/wifi';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import ToggleSwitch from '@trendmicro/react-toggle-switch';

class WifiPanel extends Component {
	render() {
		const { wifi, actions } = this.props;
		let isHosting = wifi.connectionState === 'tether';

		return (
			<div className="col col-xs-6 col-md-4">
				<div className="card">
					<h3 className="card-header">Wifi</h3>
					<div className="card-block">
						<Tabs>
							<Tab label="Client">
								{wifi.ssids.map(s => (
									<SSIDControl ssid={s} actions={actions}
															 selected={s === wifi.defaultSelected}
															 connected={s === wifi.connectedSSID}
									/>
								))}
								<div className="btn-group" role="group" aria-label="Basic example">
									<button type="button" className="btn"
													onClick={(e) => actions.scanWifi()}>Scan</button>
									<button type="button" className="btn btn-success"
													onClick={(e) => actions.connectSSID(wifi.selectedSSID)}>Connect</button>
									<button type="button" className="btn btn-danger"
													onClick={(e) => actions.disconnectWifi()}>Disconnect</button>
								</div>
							</Tab>
							<Tab label="Host">
								<ToggleSwitch checked={heater.isOn}
															onChange={(event) =>
																actions.setHeating(heater.id, !heater.isOn)
															}/>
							</Tab>
						</Tabs>
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
	return {
		actions: bindActionCreators(WifiActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WifiPanel)