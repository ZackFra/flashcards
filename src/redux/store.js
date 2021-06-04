import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const preloadedState = undefined;
const composedEnhancers = composeWithDevTools();

const store = createStore(rootReducer, preloadedState, composedEnhancers);

export default store;