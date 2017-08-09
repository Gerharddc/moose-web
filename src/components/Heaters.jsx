import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaterControl from './HeaterControl';
import * as HeaterActions from '../actions/heaters';
import printerSocket from '../PrinterSocket';

class Heaters extends Component {
	render () {
		const { heaters, actions, files } = this.props;

		return (
			<div>
				{heaters.map(h => (
					<HeaterControl key={h.id} heater={h} actions={actions} files={files}/>
				))}
			</div>
		)
	}
}

Heaters.propTypes = {
	heaters: PropTypes.array.isRequired,
	files: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		heaters: state.heaters,
		files: state.files
	}
}

function mapDispatchToProps(dispatch) {
	printerSocket.on("opened", () => {
		dispatch(HeaterActions.getHeaters());
	});

	return {
		actions: bindActionCreators(HeaterActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Heaters)