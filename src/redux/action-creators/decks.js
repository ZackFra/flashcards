import { UPDATE_DECK, INSERT_DECK, RENAME_DECK } from '../actions';

export function insertCard(deckNumber, cardNumber, card) {
	return { type: UPDATE_DECK, payload: { deckNumber, cardNumber, card } };
}

export function insertDeck(deckNumber, deck) {
	return { type: INSERT_DECK, payload: { deckNumber, deck } };
}

export function renameDeck(deckNumber, name) {
	return { type: RENAME_DECK, payload: { deckNumber, name } };
}