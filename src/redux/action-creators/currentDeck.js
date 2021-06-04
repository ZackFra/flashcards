import { SET_DECK_NAME, UPDATE_CARD } from '../actions';

export function setCurrentDeckName(name) {
	return { type: SET_DECK_NAME, payload: name};
}

export function updateCard(cardNumber, card) {
	return { type: UPDATE_CARD, payload: { cardNumber, card } };
}