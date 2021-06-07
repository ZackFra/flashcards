import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { ContextMenu, MenuOption } from './context-menu';
import DeckOption from './deck-option';
import { LeftArrowIcon, PlusInCircleIcon, RightArrowIcon } from './icons';
import RenameDeckModal from './rename-deck-modal';
import VerifyDeleteModal from './verify-delete-modal';

import { insertDeck } from '../redux/action-creators/decks';

import { getEmptyDeck } from '../utils/decks';

const DECKS_PER_PAGE = 3;

// @desc : display up to 3 decks to be switched through
function PaginatedDeck(props) {
	const [clickedDeckNumber, setClickedDeckNumber] = useState(null);

	/* RenameDeckModal */
	const [showRenameDeckModal, setShowRenameDeckModal] = useState(false);
	const spawnRenameDeckModal = (deckNumber) => () => {
		setClickedDeckNumber(deckNumber);
		setShowRenameDeckModal(true);
	}

	const hideRenameDeckModal = () => {
		setShowRenameDeckModal(false);
		setClickedDeckNumber(null);
	}

	/* VerifyDeleteModal */
	const [showVerifyDeleteModal, setShowVerifyDeleteModal] = useState(false);
	const spawnVerifyDeleteModal = (deckNumber) => () => {
		setClickedDeckNumber(deckNumber);
		setShowVerifyDeleteModal(true);
	}

	const hideVerifyDeleteModal = () => {
		setShowVerifyDeleteModal(false);
		setClickedDeckNumber(null);
	}


	const decks = useSelector(state => state.decks);
	const paginatedDecks = [];
	let index = props.index;
	const maxIndex = index + DECKS_PER_PAGE;
	while(index < decks.length && index < maxIndex) {
		paginatedDecks.push(decks[index++]);
	}
	const decksToJSX = (deck, i) => (
		<ContextMenu key={`deck-${i}`}>
			<>
				<MenuOption onClick={spawnRenameDeckModal(i)}>Rename</MenuOption>
				<MenuOption onClick={spawnVerifyDeleteModal(i)}>Delete</MenuOption>
			</>
			<DeckOption deck={deck} deckNumber={i} />
		</ContextMenu>
	)
	const decksAsJSX = paginatedDecks.map(decksToJSX);

	return (
		<>
			<VerifyDeleteModal
				show={showVerifyDeleteModal}
				onHide={hideVerifyDeleteModal}
				isDeck
				deckNumber={clickedDeckNumber}
			/>
			<RenameDeckModal 
				show={showRenameDeckModal} 
				onHide={hideRenameDeckModal} 
				deckNumber={clickedDeckNumber} 
			/>
			{decksAsJSX}
		</>
	);
}

export default function DeckSelector() {

	const [paginationIndex, setPaginationIndex] = useState(0);
	const decks = useSelector(state => state.decks);
	const dispatch = useDispatch();

	// paginate the control bar
	const paginateRight = () => setPaginationIndex(paginationIndex + 1);
	const paginateLeft = () => setPaginationIndex(paginationIndex - 1);

	// create a deck, then paginate to it
	const emptyDeck = getEmptyDeck();
	const createDeck = () => dispatch(insertDeck(decks.length, emptyDeck));

	// handle arrow clicks with appropriate function
	const onRightArrowClick = () => (paginationIndex < decks.length - DECKS_PER_PAGE) ? paginateRight() : createDeck();
	const onLeftArrowClick = () => (paginationIndex > 0) ? paginateLeft(): null;
	
	return (
		<>
			<Button onClick={onLeftArrowClick} variant='dark'>
				<LeftArrowIcon />
			</Button>

			<PaginatedDeck index={paginationIndex} />

			<Button onClick={onRightArrowClick} variant='dark'>
				{decks.length <= paginationIndex + DECKS_PER_PAGE ? <PlusInCircleIcon /> : <RightArrowIcon />}
			</Button>
		</>
	)
}