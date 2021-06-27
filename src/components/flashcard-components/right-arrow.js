import { useSelector, useDispatch } from 'react-redux';

import { putCard } from 'redux/action-creators/decks';
import { incrementCardNumber } from 'redux/action-creators/cardNumber';
import { RightArrowCircleIcon, PlusInCircleIcon } from 'components/icons/icons';

export default function RightArrowButton(props) {
	const { cardNumber, deckNumber, displayDeck, decks } = useSelector(state => state);

	const dispatch = useDispatch();
	const emptyCard = { front: '', back: ''};

	// @desc : call the onCreate meta-function, then insert a card into the deck
	const createCard = () => {
		props.onCreate?.();
		dispatch(putCard(deckNumber, cardNumber+1, emptyCard));
		dispatch(incrementCardNumber());
	}
	
	// if we're at the last card in the deck, present the create button
	if(cardNumber === displayDeck.length - 1) {
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