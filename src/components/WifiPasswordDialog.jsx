import React from 'react';
import Modal from 'react-bootstrap4-modal';

export default class WifiPasswordDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      showPass: false
    }
  }

  render() {
    const { wifi, actions } = this.props;

    return (
      <Modal visible={wifi.askPassword}>
        <div className="modal-header">
          <h5 className="modal-title">Wifi password</h5>
        </div>
        <div className="modal-body">
          <p>Please provide the password needed for this network:</p>
          <div className="input-group">
            <input className="form-control" placeholder="Password"
              type={this.state.showPass ? "text" : "password"}
              value={this.state.password}
              onChange={(event) => this.setState({ password: event.target.value })} />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button"
                onClick={(e) => this.setState({ showPass: !this.state.showPass })}>
                {this.state.showPass ? "hide" : "show"}
              </button>
            </span>
          </div>
          <span><i className="glyphicon glyphicon-eye-open"></i></span>
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