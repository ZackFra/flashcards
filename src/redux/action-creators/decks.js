import { UPDATE_DECK } from '../actions';

export function insertCard(deckNumber, cardNumber, card) {
	return { type: UPDATE_DECK, payload: { deckNumber, cardNumber, card } };
}