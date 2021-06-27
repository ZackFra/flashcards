import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { isNull } from 'lodash';

import { incrementCardNumber, decrementCardNumber, setCardNumber } from 'redux/action-creators/cardNumber';
import {  deleteCard } from 'redux/action-creators/decks';
import LeftArrowButton from './flashcard-components/left-arrow';
import RightArrowButton from './flashcard-components/right-arrow';

import { DeleteIcon } from './icons/icons';
import Flashcard from './flashcard-components/flashcard';

import './flashcard-switcher.css';
import VerifyDeleteModal from './modals/verify-delete-modal';

function hasNextCard(cardNumber, deckLength) {
	return cardNumber + 1 < deckLength;
}

function hasPrevCard(cardNumber) {
	return cardNumber - 1 >= 0;
}

export default function FlashcardSwitcher() {
	const { cardNumber, deckNumber, displayDeck } = useSelector(state => state);

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
	// @e    : <event> can be used as event-listener
	const flip = (e) => {
		e?.stopPropagation();
		setIsFlipped(!isFlipped);
		reverseFocus();
	}

	/* for moving through a deck's cards */
	
	// @desc : switch to the next card
	const nextCard = () => {
		if(hasNextCard(cardNumber, displayDeck.length)) {
			setIsFlipped(false);
			dispatch(incrementCardNumber());
		}
		focus();
	}

	// @desc : callback for the create button
	const onCreate = () => {
		setIsFlipped(false);
		if(isFlipped) {
			reverseFocus();
		} else {
			focus();
		}
	}
	
	// @desc : switch to previous card
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

		const handleClick = (e) => {
			setIsFlipped(false);
		}

		document.addEventListener('click', handleClick);
		document.addEventListener('keydown', handleKeyPress);
		focus();
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
			document.removeEventListener('click', handleClick);
		}
	}, [flip])

	/* card deletion */
	const [showVerifyModal, setShowVerifyModal] = useState(false);

	const spawnVerify = () => setShowVerifyModal(true);
	const hideVerify = () =>setShowVerifyModal(false);

	// @desc : delete the currently selected card
	const deleteThisCard = () => {
		if(displayDeck.length === 1) {
			dispatch(setCardNumber(null));
		} else if(displayDeck.length-1 === cardNumber) {
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
					[{cardNumber+1}/{displayDeck.length}]
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