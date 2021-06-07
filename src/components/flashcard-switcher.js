import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { incrementCardNumber, decrementCardNumber, setCardNumber } from 'redux/action-creators/cardNumber';
import { insertCard, deleteCard } from 'redux/action-creators/decks';

import { LeftArrowCircleIcon, PlusInCircleIcon, RightArrowCircleIcon, DeleteIcon } from './icons/icons';
import Flashcard from './flashcard-components/flashcard';

import './flashcard-switcher.css';
import VerifyDeleteModal from './modals/verify-delete-modal';

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

	/* for moving through a deck's cards */
	
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

	/* card deletion */
	const [showVerifyModal, setShowVerifyModal] = useState(false);

	const spawnVerify = () => setShowVerifyModal(true);
	const hideVerify = () => setShowVerifyModal(false);

	const deleteThisCard = () => {
		if(currentDeck.cards.length === 1) {
			dispatch(setCardNumber(null));
		} else if(currentDeck.cards.length-1 === cardNumber) {
			dispatch(decrementCardNumber());
		}
		dispatch(deleteCard(deckNumber, cardNumber));
	}

	return (
		<div className='flashcard-switcher-wrapper mt-4'>
			<VerifyDeleteModal show={showVerifyModal} onVerify={deleteThisCard} onHide={hideVerify} />
			<div className='flashcard-switcher-top-formatter'>
				<div className='flashcard-switcher-control'>
					<Button variant='danger' onClick={spawnVerify}>
						<DeleteIcon />
					</Button>
				</div>
				<p className='text-dark d-flex justify-content-end m-0'>
					[{cardNumber+1}/{currentDeck.cards.length}]
				</p>
			</div>
			<div className='flashcard-switcher-tool'>
				<LeftArrowButton onClick={prevCard} />
				<Flashcard />
				<RightArrowButton onClick={nextCard} />
			</div>
		</div>
	)
}