// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import Heaters from './Heaters'

export default class ManualControlPanel extends Component {
  constructor(props) {
		super(props)
		this.state = {
				moveAmount: 100,
        moveSpeed: 100,
        moveForward: true,
        heatingExtruder: false,
        heatingBed: false,
        extruderTemp: 0,
        bedTemp: 0,
        extruderTarget: 0,
        bedTarget: 0
		}
	}

  render() {
    return (
      <div className="col col-xs-12 col-md-8">
        <div className="card">
          <h3 className="card-header">Manual control</h3>
          <div className="container">
            <br/>
            <div className="row margin-tb">
              <div className="col">
                <div className="input-group">
                  <div className="input-group-addon">Distance</div>
                  <input type="number" className="form-control"/>
                  <div className="input-group-addon">mm</div>
                </div>
              </div>
              <div className="col">
                <div className="input-group">
                  <div className="input-group-addon">Speed</div>
                  <input type="number" className="form-control"/>
                  <div className="input-group-addon">mm/s</div>
                </div>
              </div>
              <div className="col col-3 vertcenter">
                <ToggleSwitch checked={this.state.moveForward}
                  onChange={(event) => 
                  {this.setState({moveForward: !this.state.moveForward})}}/>
                {this.state.moveForward ? "Forward" : "Backward"}
              </div>
            </div>
            <br/>
            <div className="btn-group" role="group" aria-label="Basic example">
  					  <button type="button" className="btn btn-primary">Move X</button>
  						<button type="button" className="btn">Move Y</button>
              <button type="button" className="btn btn-primary">Move Z</button>
              <button type="button" className="btn">Move E</button>
						</div>
            <br/><br/>
            <Heaters/>
          </div>
        </div>
      </div>
    );
  }
}