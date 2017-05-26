// Copyright 2017 Gerhard de Clercq

export const setDistance = (distance) => {
	return {
		type: 'SET_DISTANCE',
		distance
	}
};

export const setSpeed = (speed) => {
	return {
		type: 'SET_SPEED',
		speed
	}
};

export const setForward = (forward) => {
	return {
		type: 'SET_FORWARD',
		forward
	}
};