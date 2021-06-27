import { SET_DISPLAY_DECK, REMOVE_FROM_DISPLAY_DECK, SHUFFLE_DECK } from "redux/actions";

export function setDisplayDeck(deck) {
	return { type: SET_DISPLAY_DECK, payload: { deck } };
}

export function removeFromDisplayDeck(cardNumber) {
	return { type: REMOVE_FROM_DISPLAY_DECK, payload: { cardNumber} };
}

export function shuffleDeck() {
	return { type: SHUFFLE_DECK }
}