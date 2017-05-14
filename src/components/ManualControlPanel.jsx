// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import { Col, Panel, ControlLabel, FormControl, FormGroup, Row,
Button, ButtonToolbar } from 'react-bootstrap';
import ToggleSwitch from '@trendmicro/react-toggle-switch';

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
      <Col xs={12} md={8}>
        <Panel header={(<h3>Manual control</h3>)}>
          <Row style={{marginBottom: '10px'}} bsClass="vertcenter row">
					  <Col xs={4}>
              <FormGroup>
                <ControlLabel>Amount</ControlLabel>
                <FormControl type="number" value={this.state.moveAmount}/>
              </FormGroup>
            </Col>
					  <Col xs={4}>
              <FormGroup>
                <ControlLabel>Speed</ControlLabel>
                <FormControl type="number" value={this.state.moveSpeed}/>
              </FormGroup>
            </Col>
            <Col xs={4} height="100%">
              <ToggleSwitch checked={this.state.moveForward}
                  onChange={(event) => 
                  {this.setState({moveForward: !this.state.moveForward})}}/>
                {this.state.moveForward ? "Forward" : "Backward"}
            </Col>
					</Row>
          <ButtonToolbar>
            <Button>Move X</Button>
            <Button>Move Y</Button>
            <Button>Move Z</Button>
            <Button>Move E</Button>
          </ButtonToolbar>
          <Row style={{marginBottom: '10px', marginTop: '20px'}} bsClass="vertcenter row">
            <Col xs={3} height="100%">
              <h3>Extruder</h3>
            </Col>
            <Col xs={4} height="100%">
              <p style={{marginTop: "20px"}}><b>Actual temp:</b> {this.state.extruderTemp}</p>
            </Col>
					  <Col xs={3}>
              <FormGroup>
                <ControlLabel>Target temp</ControlLabel>
                <FormControl type="number" value={this.state.extruderTarget}/>
              </FormGroup>
            </Col>
            <Col xs={2} height="100%">
              <ToggleSwitch checked={this.state.heatingExtruder}
                  onChange={(event) => 
                  {this.setState({heatingExtruder: !this.state.heatingExtruder})}}/>
                {this.state.heatingExtruder ? "On" : "Off"}
            </Col>
					</Row>
        </Panel>
      </Col>
    );
  }
}