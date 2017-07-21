// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import ToggleSwitch from '@trendmicro/react-toggle-switch';

export default class HeaterControl extends Component {
	render() {
		const { heater, actions } = this.props;

		return (
			<div className="card">
				<div className="card-header">
					<div className="row">
						<div className="col">
							<h3>{heater.displayName}</h3>
						</div>
						<div className="col col-auto vertcenter">
							<ToggleSwitch checked={heater.isOn}
								onChange={(event) =>
									actions.setHeating(heater.id, !heater.isOn)
								} />
							{heater.isOn ? "On" : "Off"}
						</div>
					</div>
				</div>
				<div className="card-block">
					<div className="input-group">
						<div className="input-group-addon">Currently</div>
						<input type="text" className="form-control"
							value={heater.current} readOnly={true} />
						<div className="input-group-addon">°C</div>
					</div>
					<br/>
					<div className="input-group">
						<div className="input-group-addon">Target</div>
						<input type="number" className="form-control"
							value={heater.target}
							onChange={(event) =>
								actions.setTargetTemp(heater.id, event.target.value)
							} />
						<div className="input-group-addon">°C</div>
					</div>
				</div>
			</div>
		);
	}
}