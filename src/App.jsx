// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import { Jumbotron, Grid, Col, Panel } from 'react-bootstrap';
import ManualControlPanel from './components/ManualControlPanel';
import PrintInfoPanel from './components/PrintInfoPanel';
import CameraPanel from './components/CameraPanel';
import './App.css';

import logo from './img/logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="App">
        <Jumbotron>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Moose Printer</h1>
          <p>Because bigger is better!</p>
        </Jumbotron>

        <Grid className="Main-grid">
          <ManualControlPanel/>
          <PrintInfoPanel/>
          <CameraPanel/>
        </Grid>

        <footer style={{marginBottom: '10px'}}>
          © Gerhard de Clercq
        </footer>
      </div>
    );
  }
}

export default App;
