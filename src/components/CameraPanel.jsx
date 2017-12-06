// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import { ServerAddr } from '../env';

export default class CameraPanel extends Component {
  render() {
    return (
      <div className="card grid-item">
        <h3 className="card-header">Camera</h3>
        <div className="card-block">
          <div className="box">
            <img className="full-width" src={"http://" + ServerAddr + ":8081/?action=stream"}/>
          </div>
        </div>
      </div>
    );
  }
}