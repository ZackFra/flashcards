import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { isNull } from 'lodash';

import { incrementCardNumber, decrementCardNumber, setCardNumber } from 'redux/action-creators/cardNumber';
import { putCard, deleteCard } from 'redux/action-creators/decks';

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

	// @desc : call the onCreate meta-function, then insert a card into the deck
	const createCard = () => {
		props.onCreate?.();
		dispatch(putCard(deckNumber, cardNumber+1, emptyCard));
		dispatch(incrementCardNumber());
	}
	
	// if we're at the last card in the deck, present the create button
	if(cardNumber === currentDeck.cards.length - 1) {
		return (
			<button onClick={createCard} className='flashcard-switcher-add-card-button'>
				<PlusInCircleIcon />
			</button>
		)
	}

	// present the "next" button otherwise
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

	// state variable for flipping cards when needed
	const [isFlipped, setIsFlipped] = useState(false);

	// @desc : focus on the appropriate editor
	const focus = () => {
		if(!isNull(cardNumber) && !isNull(deckNumber)) {
			if(!isFlipped) {
				document.querySelector('#flashcard-front').focus();
			} else {
				document.querySelector('#flashcard-back').focus();
			}
		}
	}

	// @desc : if in the process of being flipped, focus on opposites
	const reverseFocus = () => {
		if(!isNull(cardNumber) && !isNull(deckNumber)) {
			if(isFlipped) {
				document.querySelector('#flashcard-front').focus();
			} else {
				document.querySelector('#flashcard-back').focus();
			}
		}
	}

	// @desc : flip a card
	const flip = () => {
		setIsFlipped(!isFlipped);
		reverseFocus();
	}

	/* for moving through a deck's cards */
	
	const nextCard = () => {
		if(hasNextCard(cardNumber, currentDeck.cards.length)) {
			setIsFlipped(false);
			dispatch(incrementCardNumber());
		}
		focus();
	}

	const onCreate = () => {
		setIsFlipped(false);
		if(isFlipped) {
			reverseFocus();
		} else {
			focus();
		}
	}
	
	const prevCard = () => {
		if(hasPrevCard(cardNumber)) {
			setIsFlipped(false);
			dispatch(decrementCardNumber());
		}
		focus();
	}
	// @desc : setup event-handler for flipping cards via keystroke
	useEffect(() => {
		const handleKeyPress = (e) => {

			const TAB = 9;
			const ctrlKey = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey);
			if(e.keyCode === TAB) {
				e.preventDefault();
				flip();
			} else if(ctrlKey && e.key === 'ArrowRight') {
				nextCard();
			} else if(ctrlKey && e.key === 'ArrowLeft') {
				prevCard();
			}
		}
		document.addEventListener('keydown', handleKeyPress);
		focus();
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [flip])

	/* card deletion */
	const [showVerifyModal, setShowVerifyModal] = useState(false);

	const spawnVerify = () => setShowVerifyModal(true);
	const hideVerify = () =>setShowVerifyModal(false);

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
				<Flashcard isFlipped={isFlipped} flip={flip} />
				<RightArrowButton onClick={nextCard} onCreate={onCreate} />
			</div>
		</div>
	)
}