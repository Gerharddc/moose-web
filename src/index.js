// @flow
// Copyright 2017 Gerhard de Clercq

import './index.css';
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-theme.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist'
import mooseReducer from './reducers';
import printerSocket from './PrinterSocket';

let store = createStore(mooseReducer,
	compose(
		applyMiddleware(thunkMiddleware),
		//autoRehydrate()
	));

//persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

printerSocket.setStore(store);

