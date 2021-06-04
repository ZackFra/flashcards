import { INCREMENT_CARD_NUMBER, DECREMENT_CARD_NUMBER } from '../actions';

export default function currentCardNumber(state = 0, action) {
	switch(action.type) {
		case INCREMENT_CARD_NUMBER:
			return state + 1;
		case DECREMENT_CARD_NUMBER:
			return state - 1;
		default:
			return state;
	}
}