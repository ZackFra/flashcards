import { SET_DECK_NUMBER } from '../actions';

export default function deckNumber(state = null, action) {
	switch(action.type) {
		case SET_DECK_NUMBER:
			return action.payload;
		default:
			return state;
	}
}