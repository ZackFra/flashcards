import { INCREMENT_CARD_NUMBER, DECREMENT_CARD_NUMBER, SET_CARD_NUMBER } from '../actions';

export default function currentCardNumber(state = null, action) {
	switch(action.type) {
		case INCREMENT_CARD_NUMBER:
			return state + 1;
		case DECREMENT_CARD_NUMBER:
			return state - 1;
		case SET_CARD_NUMBER:
			return action.payload;
		default:
			return state;
	}
}