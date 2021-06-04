import { SET_DECK_MODAL } from '../actions';

export function setDeckModalIsVisible(isVisible) {
	return { type: SET_DECK_MODAL, payload: isVisible };
}