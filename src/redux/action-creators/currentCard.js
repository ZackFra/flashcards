import { SET_CURRENT_CARD } from '../actions';

export function setCurrentCard(card) {
	return { type: SET_CURRENT_CARD, payload: card };
}

export function setEmptyCurrentCard() {
	return { type: SET_CURRENT_CARD, payload: { front: '', back: '' }};
}