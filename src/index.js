// @flow
// Copyright 2017 Gerhard de Clercq

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import mooseReducer from './reducers';
import DefaultState from './DefaultState';
import { getHeaters } from './actions/heaters';
import PrinterSocket from './PrinterSocket';

import './index.css';
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-theme.min.css';

let store = createStore(mooseReducer,
	DefaultState,
	applyMiddleware(thunkMiddleware));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

PrinterSocket.runOnOpen(() => {
	store.dispatch(getHeaters());
});

PrinterSocket.setStore(store);

