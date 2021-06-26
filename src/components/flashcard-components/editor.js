import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNull } from 'lodash';
import { v4 as uuid } from 'uuid';

import { putCard } from 'redux/action-creators/decks';

import { stopPropagation } from 'utils/events';
import './editor.css';

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos (input, pos) {
       setSelectionRange(input, pos, pos);
}

export default function MyEditor(props) {
	const dispatch = useDispatch();
	const { cardNumber, decks, deckNumber } = useSelector(state => state);
	const currentDeck = decks[deckNumber];
	const currentCard = currentDeck.cards[cardNumber];
	const [text, setText] = useState(props.text);
	const [cursorPos, setCursorPos] = useState(0);
	const [element, setElement] = useState(null);
	const [id] = useState(uuid());

	// @desc : update editor state when the card number changes, the
	//       : deck number changes, or the number of cards in the deck
	//       : changes.
	useEffect(() => {
		if(!isNull(cardNumber) && !isNull(deckNumber)) {
			setText(props.text);
			if(element) {
				setCaretToPos(element, cursorPos);
			}
		}
	}, [cardNumber, deckNumber, props.text]);

	// @desc : set the textarea element
	useLayoutEffect(() => {
		setElement(document.getElementById(id));
	}, []);

	// @desc        : update the current card by modifying the deck
	// @editorState : <Editor State> state after being written to
	function updateCurrentCard(e) {
		const updatedText = e.target.value;
		setCursorPos(element.selectionStart);
		console.log(element.selectionStart);
		const updatedCard = { 
			front: props.isFront ? updatedText : currentCard.front,
			back: props.isFront ? currentCard.back : updatedText 
		};
		dispatch(putCard(deckNumber, cardNumber, updatedCard));
		// no need for setText, the useEffect handles that
	}

	return (
		<div className='editor-wrapper' onClick={stopPropagation}>
			<textarea id={id} className='editor-textarea' value={text} onChange={updateCurrentCard} />
		</div>
	);
}