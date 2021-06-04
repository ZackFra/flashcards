export const ADD_DECK = 'ADD FLASH CARD';
export const REMOVE_DECK = 'REMOVE FLASH CARD';

export default function decks(state = [], action) {
	switch(action.type) {
		case ADD_DECK:
			return [...state, action.payload];
		case REMOVE_DECK:
			return state.filter(deck => deck.name !== action.payload);
		default:
			return state;
	}
}