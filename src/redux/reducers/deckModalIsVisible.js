
import { SET_DECK_MODAL } from '../actions';

export default function deckModalIsVisible(state = false, action) {
	switch(action.type) {
		case SET_DECK_MODAL:
			return action.payload;
		default:
			return state;
	}
}