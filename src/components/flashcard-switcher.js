import { useSelector, useDispatch } from 'react-redux';

import { incrementCardNumber, decrementCardNumber } from '../redux/action-creators/cardNumber';
import { insertCard } from '../redux/action-creators/decks';

import { LeftArrowCircleIcon, PlusInCircleIcon, RightArrowCircleIcon } from './icons';
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
	const { cardNumber, deckNumber, decks } = useSelector(state => state);
	const currentDeck = decks[deckNumber];

	const dispatch = useDispatch();
	const emptyCard = { front: '', back: ''};
	const createCard = () => {
		dispatch(insertCard(deckNumber, cardNumber+1, emptyCard));
		dispatch(incrementCardNumber());
	}
	
	if(cardNumber === currentDeck.cards.length - 1) {
		return (
			<button onClick={createCard}  className='flashcard-switcher-add-card-button'>
				<PlusInCircleIcon />
			</button>
		)
	}

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
	const { cardNumber, decks, deckNumber } = useSelector(state => state);
	const currentDeck = decks[deckNumber];

	const dispatch = useDispatch();

	const nextCard = () => {
		if(hasNextCard(cardNumber, currentDeck.cards.length)) {
			dispatch(incrementCardNumber());
		}
	}
	
	const prevCard = () => {
		if(hasPrevCard(cardNumber)) {
			dispatch(decrementCardNumber());
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