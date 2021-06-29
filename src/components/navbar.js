import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { isNull } from 'lodash';

import { SaveIcon, ShuffleIcon, RemoveIcon, ResetIcon } from 'components/icons/icons';
import { putDecks } from 'api';
import SavingDataModal from 'components/modals/saving-data-modal';
import { shuffleDeck } from 'redux/action-creators/displayDeck';
import { decrementCardNumber, setCardNumber } from 'redux/action-creators/cardNumber';
import { removeFromDisplayDeck, setDisplayDeck } from 'redux/action-creators/displayDeck';
import FailedToSaveModal from 'components/modals/failed-to-save-modal';
import LoginLogoutLink from 'components/login-logout-link';
import store from 'redux/store';
import './navbar.css'

export default function Navbar() {

	const [showSaving, setShowSaving] = useState(false);
	const { user, deckNumber, cardNumber, displayDeck, decks } = useSelector(state => state);
	const dispatch = useDispatch();

	const [showFailure, setShowFailure] = useState(false);
	const hideFailModal = () => setShowFailure(false);

	// @desc : remove the current card from display, but not from real deck
	const removeCurrentCard = () => {
		if(displayDeck.length === 1) {
			dispatch(setCardNumber(null));
		} else if(cardNumber === displayDeck.length - 1) {
			dispatch(decrementCardNumber());
		}
		dispatch(removeFromDisplayDeck(cardNumber))
	}
	
	// @desc : flash a modal on the screen while saving, save, then remove the modal
	const save = async () => {
		// grab decks directly to avoid old decks value being used
		const { decks } = store.getState()
		setShowSaving(true);
		try {
			await putDecks(decks);
		} catch(err) {
			setShowFailure(true);	
		} finally {
			setShowSaving(false);
		}
	}

	// @desc : shuffle a deck
	const shuffle = () => {
		if(!isNull(deckNumber) && !isNull(cardNumber)) {
			dispatch(shuffleDeck());
			dispatch(setCardNumber(0));
		}
	}

	// @desc : set the display deck to the full deck
	const resetDeck = () => {
		if(!isNull(deckNumber)) {
			dispatch(setCardNumber(0));
			dispatch(setDisplayDeck(decks[deckNumber].cards));
		}
	}

	// @desc : setup key handler for saving
	useEffect(() => {
		const handleKeyPress = async (e) => {
			const ctrlKey = navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey
			if(e.key === 's' && ctrlKey && user.isAuth) {
				e.preventDefault();
				await save();
			}
		}
		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener('keydown', handleKeyPress);
	}, [user.isAuth])

	// only show save button for authorized users
	let saveButton = undefined;
	let studyButton = undefined;
	let removeButton = undefined;
	let resetButton = undefined;
	let deckName = undefined;
	if(user.isAuth) {
		saveButton = (
			<li className='nav-item navbar-left-item'>
				<Button variant='primary' className='w-100 h-100' onClick={save}>
					<SaveIcon />
				</Button>
			</li>
		)

		studyButton = (
			<li className='nav-item navbar-left-item'>
				<Button variant='primary' className='w-100 h-100' onClick={shuffle}>
					<ShuffleIcon />
				</Button>
			</li>
		)

		removeButton = (
			<li className='nav-item navbar-left-item'>
				<Button variant='primary' className='w-100 h-100' onClick={removeCurrentCard}>
					<RemoveIcon />
				</Button>
			</li>
		)

		resetButton = (
			<li className='nav-item navbar-left-item'>
				<Button variant='primary' className='w-100 h-100' onClick={resetDeck}>
					<ResetIcon />
				</Button>
			</li>
		)
		
		if(!isNull(deckNumber)) {
			deckName = (
				<li className='nav-item navbar-left-item text-light'>
					Deck: {decks[deckNumber].name}
				</li>
			)
		}
	}

	return (
		<>
			<SavingDataModal dataName='decks' show={showSaving} />
			<FailedToSaveModal dataName='decks' show={showFailure} save={save} onHide={hideFailModal} />
			<nav className="navbar navbar-expand-sm navbar-dark bg-primary">
				<div className="container-fluid">

					<div className="navbar-container">
						<ul className="navbar-nav navbar-left">
							{/* nav links */}
							{saveButton}
							{studyButton}
							{removeButton}
							{resetButton}
							{/* <li className="nav-item navbar-left-item"> 
								<Link className={`nav-link ${user.isAuth ? 'disabled' : ''}`} to='/'>Home</Link>
							</li> */}
							{deckName}
						</ul>

						<ul className='navbar-nav navbar-right'>
							<li className="nav-item">
								<LoginLogoutLink />
							</li>
						</ul>
					</div>

				</div>
			</nav>
		</>
	)
}