import { UPDATE_DECK, INSERT_DECK, RENAME_DECK, DELETE_DECK, DELETE_CARD, SET_DECKS, SHUFFLE_DECK } from '../actions';

export function putCard(deckNumber, cardNumber, card) {
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

export function shuffleDeck(deckNumber) {
	return { type: SHUFFLE_DECK, payload: { deckNumber } }
}

export function setDecks(decks) {
	return { type: SET_DECKS, payload: { decks } };
}