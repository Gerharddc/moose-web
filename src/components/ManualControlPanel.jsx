// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import Heaters from './Heaters';
import { connect } from 'react-redux';
import * as MotionActions from '../actions/motion';

class ManualControlPanel extends Component {
	render() {
		const { motion, actions } = this.props;

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
                              <input type="number" className="form-control"
                                     value={motion.distance}
                                     onChange={(event) =>
																			 actions.setDistance(event.target.value)
																		 }/>
                              <div className="input-group-addon">mm</div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="input-group">
                              <div className="input-group-addon">Speed</div>
                              <input type="number" className="form-control"
                                     value={motion.speed}
                                     onChange={(event) =>
																			 actions.setSpeed(event.target.value)
																		 }/>
                              <div className="input-group-addon">mm/s</div>
                          </div>
                      </div>
                      <div className="col col-3 vertcenter">
                          <ToggleSwitch checked={motion.forward}
                                        onChange={(event) => {
																					actions.setForward(!motion.forward);
																				}}/>
												{motion.forward ? "Forward" : "Backward"}
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

ManualControlPanel.propTypes = {
	motion: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		motion: state.motion
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(MotionActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManualControlPanel)