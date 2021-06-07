import { useDispatch, useSelector } from 'react-redux';

import Navbar from 'components/navbar';
import Controls from 'components/controls';
import FlashcardSwitcher from 'components/flashcard-switcher';

import { PlusInCircleIcon } from 'components/icons/icons';
import { insertCard } from 'redux/action-creators/decks';

import './study.css';
import { setCardNumber } from 'redux/action-creators/cardNumber';

function PageBody() {
	const { deckNumber, cardNumber } = useSelector(state => state);
	const deckSelected = deckNumber !== null;
	const hasCard = cardNumber !== null;

	const dispatch = useDispatch();
	const createCard = () => {
		const emptyCard = { front: '', back: ''};
		dispatch(insertCard(deckNumber, 0, emptyCard));
		dispatch(setCardNumber(0));
	}

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
		<div className='container-fluid d-lg-flex flex-row align-items-center justify-content-center align-items-center'>
			{body}
		</div>
	);
}

export default function Study() {

	return (
		<>		
			<Navbar />
			<PageBody />
			<Controls />
		</>
	)
}