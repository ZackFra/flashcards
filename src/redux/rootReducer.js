import { combineReducers } from 'redux';

import decks from './reducers/decks';
import currentDeck from './reducers/currentDeck';
import deckModalIsVisible from './reducers/deckModalIsVisible';
import currentCardNumber from './reducers/currentCardNumber';
import currentCard from './reducers/currentCard';

const rootReducer = combineReducers({
	decks,
	currentDeck,
	currentCard,
	currentCardNumber,
	deckModalIsVisible,
});

export default rootReducer;