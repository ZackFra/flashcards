import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNull } from 'lodash';

import { putCard } from 'redux/action-creators/decks';

import { stopPropagation } from 'utils/events';
import './editor.css';

export default function MyEditor(props) {
	const dispatch = useDispatch();
	const { cardNumber, decks, deckNumber } = useSelector(state => state);
	const currentDeck = decks[deckNumber];
	const currentCard = currentDeck.cards[cardNumber];
	const [text, setText] = useState(props.text);

	// @desc : update editor state when the card number changes, the
	//       : deck number changes, or the number of cards in the deck
	//       : changes.
	useEffect(() => {
		if(!isNull(cardNumber) && !isNull(deckNumber)) {
			if(props.text !== text) {
				setText(props.text);
			}
		}
	}, [cardNumber, deckNumber, text, props.text]);

	// @desc        : update the current card by modifying the deck
	// @editorState : <Editor State> state after being written to
	function updateCurrentCard(e) {
		const updatedText = e.target.value;
		const updatedCard = { 
			front: props.isFront ? updatedText : currentCard.front,
			back: props.isFront ? currentCard.back : updatedText 
		};
		setText(updatedText);
		dispatch(putCard(deckNumber, cardNumber, updatedCard));
	}

	const id = useMemo(() => props.isFront ? 'flashcard-front' : 'flashcard-back', [props.isFront])

	return (
		<div className='editor-wrapper' onClick={stopPropagation}>
			<textarea id={id}className='editor-textarea' value={text} onChange={updateCurrentCard} />
		</div>
	);
}