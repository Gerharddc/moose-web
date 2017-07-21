import React from 'react';
import Modal from 'react-bootstrap4-modal';

export default class NotifyDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: true
		}
	}

	render() {
		const noti = this.props.notification;

		return (
			<Modal visible={this.state.visible}>
				<div className="modal-header">
					<h5 className="modal-title">{noti.title}</h5>
				</div>
				<div className="modal-body">
					<p>{noti.message}</p>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary"
						onClick={(e) => {
							this.setState({visible: false});
							noti.remove();
						}}>
						Ok
					</button>
				</div>
			</Modal>
		)
	}
}