import { combineReducers } from 'redux';

import decks from './reducers/decks';
import cardNumber from './reducers/cardNumber';
import deckNumber from './reducers/deckNumber';

const rootReducer = combineReducers({
	decks,
	deckNumber,
	cardNumber,
});

export default rootReducer;