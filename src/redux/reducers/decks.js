import { INSERT_DECK, DELETE_DECK, UPDATE_DECK, RENAME_DECK, DELETE_CARD } from '../actions';

export default function decks(state = [], action) {
	let decks = [...state];
	switch(action.type) {
		case INSERT_DECK:
			decks[action.payload.deckNumber] = action.payload.deck;
			return decks;
		case DELETE_DECK:
			decks.splice(action.payload.deckNumber, 1);
			return decks;
		case DELETE_CARD:
			decks[action.payload.deckNumber].cards.splice(action.payload.cardNumber, 1);
			return decks;
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