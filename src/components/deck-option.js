import { useDispatch } from 'react-redux';

import { setCurrentDeck } from '../redux/action-creators/currentDeck';
import { setCardNumber } from '../redux/action-creators/currentCardNumber';
import { setCurrentCard } from '../redux/action-creators/currentCard';
import { setDeckNumber } from '../redux/action-creators/deckNumber';

import { FlashcardIcon } from './icons';
import './deck-option.css';

export default function DeckOption({deck, deckNumber}) {
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch(setCurrentDeck(deck));
		if(deck.cards.length > 0) {
			dispatch(setCardNumber(0));
		} else {
			dispatch(setCardNumber(null));
		}
		dispatch(setDeckNumber(deckNumber));

		// may be empty deck
		const nextCard = deck.cards[0];
		if(nextCard) {
			dispatch(setCurrentCard(nextCard));
		} else {
			dispatch(setCurrentCard(null));
		}
	}
	
	return (
		<button className='deck-option align-items-center text-light' onClick={onClick}>
			<p className='text-center m-0'>{deck.name}</p>
			<FlashcardIcon />
		</button>
	)
}