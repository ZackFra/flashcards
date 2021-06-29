import { useDispatch, useSelector } from 'react-redux';
import { isNull } from 'lodash';
import { useEffect, useState } from 'react';

import Navbar from 'components/navbar';
import Controls from 'components/controls';
import FlashcardSwitcher from 'components/flashcard-switcher';
import FailedToLoadModal from 'components/modals/failed-to-load-modal';

import { PlusInCircleIcon } from 'components/icons/icons';
import { putCard, setDecks } from 'redux/action-creators/decks';
import { setCardNumber } from 'redux/action-creators/cardNumber';
import { setDisplayDeck } from 'redux/action-creators/displayDeck';

import './study.css';
import { getDeck, putDecks } from 'api';
import store from 'redux/store';

export default function Study() {
	const { deckNumber, cardNumber, user, decks } = useSelector(state => state);
	const username = useSelector(state => state.user?.data?.username || null);
	const deckSelected = deckNumber !== null;
	const hasCard = !isNull(cardNumber);

	const dispatch = useDispatch();

	// @desc : create a new card, store it in redux
	const createCard = () => {
		const emptyCard = { front: '', back: ''};
		const endOfDeck = decks[deckNumber].cards.length;
		dispatch(putCard(deckNumber, endOfDeck, emptyCard));
		dispatch(setCardNumber(0));
		
		// gotta grab the deck directly from the store to update this properly
		dispatch(setDisplayDeck(store.getState().decks[deckNumber].cards));
	}

	const [showFailModal, setShowFailModal] = useState(false);
	const hideFailModal = () => setShowFailModal(false);

	useEffect(() => {
		if(!isNull(deckNumber)) {
			dispatch(setDisplayDeck(decks[deckNumber].cards));
		} else {
			dispatch(setDisplayDeck([]));
		}
	}, [decks, deckNumber, decks[deckNumber]?.cards.length, dispatch]);

	// get the user's deck
	useEffect(() => {
		const updateDecks = async () => {
			debugger
			if(user.isAuth) {
				try {
					const response = await getDeck(username);
					if(response.status === 200) {
						dispatch(setDecks(response.data));
					} else {
						throw new Error('Failed to load');
					}
				} catch(err) {
					// hacky hacky
					if(err.response.status === 404) {
						try {
							await putDecks([]);
							dispatch(setDecks([]));
						} catch(err) {
							setShowFailModal(true);
						}
					} else {
						setShowFailModal(true);
					}
				}
			}
		}
		updateDecks();
	}, [user.isAuth, username, dispatch])

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
			<FailedToLoadModal failedData={'Decks'} show={showFailModal} onHide={hideFailModal} />
			<div className='container-fluid d-lg-flex flex-row align-items-center justify-content-center align-items-center'>
				{body}
			</div>
			<Controls />
		</>
	)
}