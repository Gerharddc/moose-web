import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaterControl from './HeaterControl';
import * as HeaterActions from "../actions/heaters"

class Heaters extends Component {
  render () {
    const { heaters, actions } = this.props

    return (
      <div>
        {heaters.map(h => (
          <HeaterControl heater={h} actions={actions}/>
          ))}
      </div>
    )
  }
}

Heaters.propTypes = {
  heaters: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    heaters: state.heaters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HeaterActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Heaters)