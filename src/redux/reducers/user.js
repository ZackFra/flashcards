import { LOGIN_USER, LOGOUT_USER } from '../actions';

const noUser = {
	isAuth: false,
	data: null
}

export default function user(state = noUser, action) {
	switch(action.type) {
		case LOGIN_USER:
			return { isAuth: true, data: action.payload };
		case LOGOUT_USER:
			return noUser;
		default:
			return state;
	}
}