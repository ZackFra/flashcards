import { SET_DECK_NAME, UPDATE_CARD, SET_CURRENT_DECK } from '../actions';

export function setCurrentDeck(deck) {
	return { type: SET_CURRENT_DECK, payload: deck };
}

export function setCurrentDeckName(name) {
	return { type: SET_DECK_NAME, payload: name};
}

export function updateCard(cardNumber, card) {
	return { type: UPDATE_CARD, payload: { cardNumber, card } };
}