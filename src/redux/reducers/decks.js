import { INSERT_DECK, REMOVE_DECK, UPDATE_DECK, RENAME_DECK } from '../actions';

export default function decks(state = [], action) {
	let decks = [...state];
	switch(action.type) {
		case INSERT_DECK:
			decks[action.payload.deckNumber] = action.payload.deck;
			return decks;
		case REMOVE_DECK:
			return decks.filter(deck => deck.name !== action.payload);
		case UPDATE_DECK:
			decks[action.payload.deckNumber].cards[action.payload.cardNumber] = action.payload.card;
			return decks;
		case RENAME_DECK:
			decks[action.payload.deckNumber].name = action.payload.name;
			return decks;
		default:
			return state;
	}
}