// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';

export default class CameraPanel extends Component {
  render() {
    return (
      <div className="card grid-item">
        <h3 className="card-header">Camera</h3>
        <div className="card-block">
          <div className="box">
            <iframe className="full-width" src="https://www.youtube.com/embed/Ib4EX5u9hGk" frameBorder="0"/>
          </div>
        </div>
      </div>
    );
  }
}