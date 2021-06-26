import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { isNull } from 'lodash';

import { logout } from 'utils/user';
import { SaveIcon, ShuffleIcon } from 'components/icons/icons';
import { putDecks } from 'api';
import SavingDataModal from 'components/modals/saving-data-modal';
import { shuffleDeck } from 'redux/action-creators/decks';
import { setCardNumber } from 'redux/action-creators/cardNumber';
import './navbar.css'


const LoginLogoutLink = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const logoutBtn = useMemo(() => {
		const onLogout = () => logout(dispatch);
		return <Button onClick={onLogout} variant='primary' className='nav-link'>Logout</Button> 
	}, [dispatch]);

	const loginLink = useMemo(() => { 
		return <Link className="nav-link btn btn-primary" to='/login'>Login</Link>
	}, [])
	
	const [btn, setBtn] = useState(user.isAuth ? logoutBtn : loginLink)

	useEffect(() => {
		setBtn(user.isAuth ? logoutBtn : loginLink);
	}, [user.isAuth, logoutBtn, loginLink])

	return btn;
}

export default function Navbar() {

	const [showSaving, setShowSaving] = useState(false);
	const decks = useSelector(state => state.decks);
	const user = useSelector(state => state.user);
	const deckNumber = useSelector(state => state.deckNumber);
	const cardNumber = useSelector(state => state.cardNumber);
	const dispatch = useDispatch();
	
	// @desc : flash a modal on the screen while saving, save, then remove the modal
	const save = async () => {
		setShowSaving(true);
		await putDecks(decks);
		setShowSaving(false);
	}

	const shuffle = () => {
		if(!isNull(deckNumber) && !isNull(cardNumber)) {
			dispatch(shuffleDeck(deckNumber));
			dispatch(setCardNumber(0));
		}
	}

	// only show save button for authorized users
	let saveButton = undefined;
	let studyButton = undefined;
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
	}

	return (
		<>
			<SavingDataModal dataName='decks' show={showSaving} />
			<nav className="navbar navbar-expand-sm navbar-dark bg-primary">
				<div className="container-fluid">

					<div className="navbar-container">
						<ul className="navbar-nav navbar-left">
							{/* nav links */}
							{saveButton}
							{studyButton}
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