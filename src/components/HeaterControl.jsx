// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import ToggleSwitch from '@trendmicro/react-toggle-switch';

export default class HeaterControl extends Component {
	render() {
		const { heater, actions } = this.props;

		return (
			<div className="row margin-tb">
				<div className="col-2 vertcenter">
					<h4>{heater.displayName}</h4>
				</div>
				<div className="col">
					<div className="input-group">
						<div className="input-group-addon">Currently</div>
						<input type="text" className="form-control"
									 value={heater.current} readOnly={true}/>
						<div className="input-group-addon">°C</div>
					</div>
				</div>
				<div className="col">
					<div className="input-group">
						<div className="input-group-addon">Target</div>
						<input type="number" className="form-control"
									 value={heater.target}
									 onChange={(event) =>
										 actions.setTargetTemp(heater.id, event.target.value)
									 }/>
						<div className="input-group-addon">°C</div>
					</div>
				</div>
				<div className="col col-2 vertcenter">
					<ToggleSwitch checked={heater.isOn}
												onChange={(event) =>
													actions.setHeating(heater.id, !heater.isOn)
												}/>
					{heater.isOn ? "On" : "Off"}
				</div>
			</div>
		);
	}
}