import { useDispatch, useSelector } from 'react-redux';

import Navbar from 'components/navbar';
import Controls from 'components/controls';
import FlashcardSwitcher from 'components/flashcard-switcher';

import { PlusInCircleIcon } from 'components/icons/icons';
import { insertCard } from 'redux/action-creators/decks';

import './study.css';
import { setCardNumber } from 'redux/action-creators/cardNumber';

export default function Study() {
	const { deckNumber, cardNumber } = useSelector(state => state);
	const deckSelected = deckNumber !== null;
	const hasCard = cardNumber !== null;

	const dispatch = useDispatch();

	// @desc : create a new card, store it in redux
	const createCard = () => {
		const emptyCard = { front: '', back: ''};
		dispatch(insertCard(deckNumber, 0, emptyCard));
		dispatch(setCardNumber(0));
	}

	// set the body to be appropriate
	// if there's a selected deck and there's a card selected, render the flashcard switcher
	// if there's no deck selected render the "select a deck" message
	// if there's a deck selected but no cards at all, render the "create a card" message
	let body;
	if(deckSelected && hasCard) {
		body = <FlashcardSwitcher />
	} else if(!deckSelected) {
		body = <p>Select a deck!</p>
	} else {
		body = (
			<div className='d-flex flex-column'>
				<p>Create a card!</p>
				<button onClick={createCard} className='add-card-button'>
					<PlusInCircleIcon />
				</button>
			</div>
		);
	}

	return (
		<>		
			<Navbar />
			<div className='container-fluid d-lg-flex flex-row align-items-center justify-content-center align-items-center'>
				{body}
			</div>
			<Controls />
		</>
	)
}