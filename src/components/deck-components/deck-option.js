import { useDispatch, useSelector } from 'react-redux';

import { setCardNumber } from 'redux/action-creators/cardNumber';
import { setDeckNumber } from 'redux/action-creators/deckNumber';
import { setDisplayDeck } from 'redux/action-creators/displayDeck';

import { FlashcardIcon } from 'components/icons/icons';
import './deck-option.css';

export default function DeckOption({deck, deckNumber}) {
	const dispatch = useDispatch();
	const { decks } = useSelector(state => state);

	const onClick = () => {
		if(deck.cards.length > 0) {
			dispatch(setCardNumber(0));
		} else {
			dispatch(setCardNumber(null));
		}
		dispatch(setDeckNumber(deckNumber));
		dispatch(setDisplayDeck(decks[deckNumber].cards));
	}
	
	return (
		<button className='deck-option align-items-center text-light' onClick={onClick}>
			<p className='text-center m-0'>{deck.name || 'Unnamed Deck'}</p>
			<FlashcardIcon />
		</button>
	)
}