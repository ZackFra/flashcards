import { INCREMENT_CARD_NUMBER, DECREMENT_CARD_NUMBER, SET_CARD_NUMBER } from '../actions';

export function setCardNumber(cardNumber) {
	return { type: SET_CARD_NUMBER, payload: cardNumber }; 
}

export function incrementCardNumber() {
	return { type: INCREMENT_CARD_NUMBER };
}

export function decrementCardNumber() {
	return { type: DECREMENT_CARD_NUMBER };
}