import { useSelector, useDispatch } from 'react-redux';

import { incrementCardNumber, decrementCardNumber } from '../redux/action-creators/currentCardNumber';
import { setCurrentCard } from '../redux/action-creators/currentCard';

import { LeftArrowCircleIcon, RightArrowCircleIcon } from './icons';
import Flashcard from './flashcard';

import './flashcard-switcher.css';

function LeftArrowButton(props) {
	return (
		<button onClick={props.onClick} className='flashcard-switcher-arrow-button'>
			<LeftArrowCircleIcon />
		</button>
	);
}

function RightArrowButton(props) {
	return (
		<button onClick={props.onClick} className='flashcard-switcher-arrow-button'>
			<RightArrowCircleIcon />
		</button>
	);
}

function hasNextCard(cardNumber, deckLength) {
	return cardNumber + 1 < deckLength;
}

function hasPrevCard(cardNumber) {
	return cardNumber - 1 >= 0;
}

export default function FlashcardSwitcher() {
	const { currentDeck, currentCardNumber } = useSelector(state => state);
	const dispatch = useDispatch();

	const nextCard = () => {
		if(hasNextCard(currentCardNumber, currentDeck.cards.length)) {
			dispatch(incrementCardNumber());
			dispatch(setCurrentCard(currentDeck.cards[currentCardNumber+1]));
		}
	}
	
	const prevCard = () => {
		if(hasPrevCard(currentCardNumber)) {
			dispatch(decrementCardNumber());
			dispatch(setCurrentCard(currentDeck.cards[currentCardNumber-1]));
		}
	}

	return (
		<>
			<LeftArrowButton onClick={prevCard} />
			<Flashcard />
			<RightArrowButton onClick={nextCard} />
		</>
	)
}