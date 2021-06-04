import { SET_DECK_NAME, UPDATE_CARD } from '../actions';

const emptyDeck = {
	name: 'Dummy Deck',
	/* dummy deck */
	cards: [ 
		{front: 'swag', back: 'yeet'},
		{front: 'ayy', back: 'lmao'},
		{front: '2+2=?', back: '4'}
	]
};

export default function currentDeck(state = emptyDeck, action) {
	let cards = [...state.cards];
	let name = state.name;

	switch(action.type) {
		case SET_DECK_NAME:
			name = action.payload;
			break;
		case UPDATE_CARD:
			cards[action.payload.cardNumber] = action.payload.card;
			break;
		default: break;
	}
	return { name, cards };
}