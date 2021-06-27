import { Auth } from 'aws-amplify';
import { logoutUser } from 'redux/action-creators/user';
import { setDecks } from 'redux/action-creators/decks';
import { setCardNumber } from 'redux/action-creators/cardNumber';
import { setDeckNumber } from 'redux/action-creators/deckNumber';
import { setDisplayDeck } from 'redux/action-creators/displayDeck';


export function logout(dispatch) {
	Auth.signOut();
	dispatch(logoutUser());
	dispatch(setDecks([]));
	dispatch(setCardNumber(null));
	dispatch(setDeckNumber(null))
	dispatch(setDisplayDeck([]));
}