import React from 'react';

export default class WifiPasswordDialog extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      showPass: false
    }
  }

	render() {
		return (
			<div className="input-group">
				<input className="form-control" placeholder="Password"
					type={this.state.showPass ? "text" : "password"}
					value={this.props.value}
					onChange={(event) => this.props.onChange(event.target.value)}/>
				<span className="input-group-btn">
					<button className="btn btn-secondary" type="button"
						onClick={(e) => this.setState({ showPass: !this.state.showPass })}>
						{this.state.showPass ? "hide" : "show"}
					</button>
				</span>
			</div>
		)
	}
}