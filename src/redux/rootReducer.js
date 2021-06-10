import { combineReducers } from 'redux';

import decks from './reducers/decks';
import cardNumber from './reducers/cardNumber';
import deckNumber from './reducers/deckNumber';
import user from './reducers/user';

const rootReducer = combineReducers({
	decks,
	deckNumber,
	cardNumber,
	user
});

export default rootReducer;