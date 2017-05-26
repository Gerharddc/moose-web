// Copyright 2017 Gerhard de Clercq

const defMotion = {
	distance: 10,
	speed: 100,
	forward: true
};

const motion = (state = defMotion, action) => {
	switch (action.type) {
		case 'SET_DISTANCE':
			return Object.assign({}, state, {
				distance: action.distance
			});
		case 'SET_SPEED':
			return Object.assign({}, state, {
				speed: action.speed
			});
		case 'SET_FORWARD':
			return Object.assign({}, state, {
				forward: action.forward
			});

		default:
			return state;
	}
};

export default motion;
