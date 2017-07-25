// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
//import ReactPlayer from 'react-player'

/*export default class CameraPanel extends Component {
  render() {
    return (
      <Col xs={12} md={8}>
        <Panel header={(<h3>Camera view</h3>)} bsStyle="primary">
            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width="100%" />
        </Panel>
      </Col>
    );
  }
}*/

export default class CameraPanel extends Component {
  render() {
    return (
      <div className="card">
        <h3 className="card-header">Camera</h3>
        <div className="card-block">
          <div className="box">
            <iframe className="full-width" src="https://www.youtube.com/embed/Ib4EX5u9hGk" frameborder="0"/>
          </div>
        </div>
      </div>
    );
  }
}