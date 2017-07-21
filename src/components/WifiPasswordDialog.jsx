import React from 'react';
import Modal from 'react-bootstrap4-modal';
import PasswordBox from './PasswordBox';

export default class WifiPasswordDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ""
    }
  }

  render() {
    const { wifi, actions } = this.props;

    return (
      <Modal visible={wifi.askPassword || false}>
        <div className="modal-header">
          <h5 className="modal-title">Wifi password</h5>
        </div>
        <div className="modal-body">
          <p>Please provide the password needed for this network:</p>
          <PasswordBox value={this.state.password}
            onChange={(pwd) => this.setState({ password: pwd })} />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary"
            onClick={(e) => actions.setAskPassword(false)}>
            Cancel
        </button>
          <button type="button" className="btn btn-primary"
            onClick={(e) => {
              actions.setAskPassword(false);
              actions.connectSSID(wifi.selectedSSID, this.state.password);
            }
            }>
            Connect
        </button>
        </div>
      </Modal>
    )
  }
}