import { SET_DISPLAY_DECK, REMOVE_FROM_DISPLAY_DECK, SHUFFLE_DECK } from '../actions';
import { shuffle } from 'lodash';

export default function user(state = [], action) {
	let deck = [...state]
	switch(action.type) {
		case SHUFFLE_DECK:
			deck = shuffle(deck);
			return deck;
		case SET_DISPLAY_DECK:
			return action.payload.deck;
		case REMOVE_FROM_DISPLAY_DECK:
			deck.splice(action.payload.cardNumber, 1);
			return deck;
		default:
			return state;
	}
}