// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';

export default class SSIDControl extends Component {
    render() {
        const { ssid, actions } = this.props;

        return (
            <div className="row margin-tb">
                <p>{ssid}</p>
            </div>
        );
    }
}