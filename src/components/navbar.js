import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { isNull } from 'lodash';

import { SaveIcon, ShuffleIcon, RemoveIcon } from 'components/icons/icons';
import { putDecks } from 'api';
import SavingDataModal from 'components/modals/saving-data-modal';
import { shuffleDeck } from 'redux/action-creators/decks';
import { setCardNumber } from 'redux/action-creators/cardNumber';
import FailedToSaveModal from 'components/modals/failed-to-save-modal';
import LoginLogoutLink from 'components/login-logout-link';
import store from 'redux/store';
import './navbar.css'

export default function Navbar() {

	const [showSaving, setShowSaving] = useState(false);
	const { user, deckNumber, cardNumber, decks } = useSelector(state => state);
	const dispatch = useDispatch();

	const [showFailure, setShowFailure] = useState(false);
	const hideFailModal = () => setShowFailure(false);

	// temporarily removed cards
	const [removedCards, setRemovedCards] = useState([]);
	const removeCurrentCard = () => {
		const currentCard = decks[deckNumber].cards[cardNumber];
		setRemovedCards([...removedCards, currentCard]);
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
			dispatch(shuffleDeck(deckNumber));
			dispatch(setCardNumber(0));
		}
	}

	// @desc : setup key handler for saving
	useEffect(() => {
		const handleKeyPress = async (e) => {
			if(e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && user.isAuth) {
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
							<li className="nav-item navbar-left-item"> 
								<Link className={`nav-link ${user.isAuth ? 'disabled' : ''}`} to='/'>Home</Link>
							</li>
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