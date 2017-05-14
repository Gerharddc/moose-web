// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';
import ReactPlayer from 'react-player'

export default class CameraPanel extends Component {
  render() {
    return (
      <Col xs={12} md={8}>
        <Panel header={(<h3>Camera view</h3>)} bsStyle="primary">
            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width="100%" />
        </Panel>
      </Col>
    );
  }
}