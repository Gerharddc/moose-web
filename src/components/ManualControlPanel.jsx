// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import { connect } from 'react-redux';
import * as MotionActions from '../actions/motion';

class ManualControlPanel extends Component {
	render() {
		const { motion, actions, files } = this.props;
		const moveAxis = function (axis) {
			actions.moveAxis(motion.distance, motion.speed, motion.forward, axis)
		};

		return (
			<div className="card grid-item">
				<h3 className="card-header">Manual control</h3>
				<div className="card-block">
					<div className="input-group">
						<div className="input-group-addon">Distance</div>
						<input type="number" className="form-control"
							value={motion.distance}
							onChange={(event) => actions.setDistance(event.target.value)} />
						<div className="input-group-addon">mm</div>
					</div>
					<br />
					<div className="input-group">
						<div className="input-group-addon">Speed</div>
						<input type="number" className="form-control"
							value={motion.speed}
							onChange={(event) => actions.setSpeed(event.target.value)} />
						<div className="input-group-addon">mm/s</div>
					</div>
					<br />
					<h5>Move</h5>
					<div className="vertcenter">
						<ToggleSwitch checked={motion.forward}
							onChange={(event) => actions.setForward(!motion.forward)} />
						{motion.forward ? "Forward" : "Backward"}
					</div>
					<br />
					<div className="btn-group">
						<button type="button" className="btn btn-primary"
							disabled={files.printing}
							onClick={e => moveAxis('x')}>X</button>
						<button type="button" className="btn"
							disabled={files.printing}
							onClick={e => moveAxis('y')}>Y</button>
						<button type="button" className="btn btn-primary"
							disabled={files.printing}
							onClick={e => moveAxis('z')}>Z</button>
						<button type="button" className="btn"
							disabled={files.printing}
							onClick={e => moveAxis('e')}>E</button>
					</div>
					<br />
					<br />
					<h5>Home</h5>
					<div className="btn-group">
						<button type="button" className="btn btn-primary"
							disabled={files.printing}
							onClick={e => actions.homeAxis('x')}>X</button>
						<button type="button" className="btn"
							disabled={files.printing}
							onClick={e => actions.homeAxis('y')}>Y</button>
						<button type="button" className="btn btn-primary"
							disabled={files.printing}
							onClick={e => actions.homeAxis('z')}>Z</button>
						<button type="button" className="btn btn"
							disabled={files.printing}
							onClick={e => actions.homeAxis('a')}>All</button>
					</div>
				</div>
			</div>
		);
	}
}

ManualControlPanel.propTypes = {
	motion: PropTypes.object.isRequired,
	files: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		motion: state.motion,
		files: state.files
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