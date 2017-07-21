// Copyright 2017 Gerhard de Clercq

import React, { Component } from 'react';

export default class FileControl extends Component {
    render() {
        const { file, actions, files } = this.props;
        const selected = (file === files.selectedFile);

        return (
            <li className={"list-group-item"
                + (selected ? " active" : "")}
                onClick={e => {
                    actions.selectFile(file);
                    e.stopPropagation();
                }}>
                {file}
            </li>
        )
    }
}