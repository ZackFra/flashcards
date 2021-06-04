import { ADD_DECK, REMOVE_DECK, UPDATE_DECK } from '../actions';
const dummyDecks = [
	{name: 'swag', cards: []},
	{name: 'Y33t', cards: []},
	{name: 'ayy', cards: []},
	{name: 'foo', cards: []}
]

export default function decks(state = dummyDecks, action) {
	let decks;
	switch(action.type) {
		case ADD_DECK:
			return [...state, action.payload];
		case REMOVE_DECK:
			return state.filter(deck => deck.name !== action.payload);
		case UPDATE_DECK:
			decks = [ ...state];
			decks[action.payload.deckNumber].cards[action.payload.cardNumber] = action.payload.card;
			return decks;
		default:
			return state;
	}
}