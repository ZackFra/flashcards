import { UPDATE_DECK, INSERT_DECK, RENAME_DECK, DELETE_DECK, DELETE_CARD} from '../actions';

export function insertCard(deckNumber, cardNumber, card) {
	return { type: UPDATE_DECK, payload: { deckNumber, cardNumber, card } };
}

export function insertDeck(deckNumber, deck) {
	return { type: INSERT_DECK, payload: { deckNumber, deck } };
}

export function renameDeck(deckNumber, name) {
	return { type: RENAME_DECK, payload: { deckNumber, name } };
}

export function deleteDeck(deckNumber) {
	return { type: DELETE_DECK, payload: { deckNumber } };
}

export function deleteCard(deckNumber, cardNumber) {
	return { type: DELETE_CARD, payload: {deckNumber, cardNumber} };
}