// Copyright 2017 Gerhard de Clercq

import { combineReducers } from 'redux';
import heaters from './heaters';
import motion from './motion';

const mooseReducer = combineReducers({
	heaters,
	motion
});

export default mooseReducer;