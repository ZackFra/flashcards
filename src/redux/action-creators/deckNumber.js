import { SET_DECK_NUMBER } from "../actions"

export function setDeckNumber(num) {
	return { type: SET_DECK_NUMBER, payload: num };
}