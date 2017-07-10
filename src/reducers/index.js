// Copyright 2017 Gerhard de Clercq

import { combineReducers } from 'redux';
import heaters from './heaters';
import motion from './motion';
import wifi from './wifi';

const mooseReducer = combineReducers({
	heaters,
	motion,
	wifi
});

export default mooseReducer;