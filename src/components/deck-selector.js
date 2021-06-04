import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import DeckOption from './deck-option';
import { v4 as uuid } from 'uuid';
import { LeftArrowIcon, RightArrowIcon } from './icons';

const DECKS_PER_PAGE = 3;

// @desc : display up to 3 decks to be switched through
function PaginatedDeck(props) {
	const decks = useSelector(state => state.decks);
	const paginatedDecks = [];
	let index = props.index;
	const maxIndex = index + DECKS_PER_PAGE;
	while(index < decks.length && index < maxIndex) {
		paginatedDecks.push(decks[index++]);
	}

	return paginatedDecks.map( (deck, i) => <DeckOption key={uuid()} deck={deck} deckNumber={i} />)
}

export default function DeckSelector() {

	const [paginationIndex, setPaginationIndex] = useState(0);
	const decks = useSelector(state => state.decks);

	const paginateRight = () => setPaginationIndex(paginationIndex + 1);
	const paginateLeft = () => setPaginationIndex(paginationIndex - 1);
	const onRightArrowClick = () => (paginationIndex < decks.length - DECKS_PER_PAGE) ? paginateRight() : null;
	const onLeftArrowClick = () => (paginationIndex > 0) ? paginateLeft(): null;
	
	return (
		<>
			<Button onClick={onLeftArrowClick} variant='dark'>
				<LeftArrowIcon />
			</Button>

			<PaginatedDeck index={paginationIndex} />

			<Button onClick={onRightArrowClick} variant='dark'>
				<RightArrowIcon />
			</Button>
		</>
	)
}