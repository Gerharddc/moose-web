import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import mooseApp from './reducers'
import DefaultState from './DefaultState'

import './index.css';
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-theme.min.css';

let store = createStore(mooseApp, DefaultState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
