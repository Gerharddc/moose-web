// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';

export default class SSIDControl extends Component {
    render() {
        const { ssid, actions, wifi } = this.props;

        const selected = (ssid === wifi.selectedSSID);
        const connected = (ssid === wifi.connectedSSID);

        return (
            <li className={"list-group-item"
                + (selected ? " active" : "")
                + (connected ? " bold-text" : "")}
                onClick={e => actions.selectSSID(ssid)}>
                {ssid.Name}
            </li>
        )
    }
}