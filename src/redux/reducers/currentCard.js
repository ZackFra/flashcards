/*
	card: {
		front: <string>,
		back: <string>,
	}
*/
import { SET_CURRENT_CARD } from '../actions';

export default function currentCard(state = {front: 'swag', back: 'yeet'}, action) {
	switch(action.type) {
		case SET_CURRENT_CARD:
			return action.payload;
		default:
			return state;
	}
}