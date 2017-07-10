// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';

export default class SSIDControl extends Component {
    render() {
        const { ssid, actions, selected, connected } = this.props;

        return (
            <div className={"row margin-tb" + (selected ? " selected-row" : "")}
            onClick={e => actions.selectSSID(ssid)}>
                <p>{ssid}</p>
            </div>
        );

        // TODO: show if connected
    }
}