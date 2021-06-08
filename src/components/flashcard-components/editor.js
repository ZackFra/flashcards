import { useEffect, useState } from 'react';
import {Editor, EditorState, getDefaultKeyBinding, ContentState} from 'draft-js';
import { useDispatch, useSelector } from 'react-redux';

import { insertCard } from 'redux/action-creators/decks';

import { stopPropagation } from 'utils/events';

import 'draft-js/dist/Draft.css';
import './editor.css';

// @desc   : return 'not-handled' so default key binding always used
// @return : <string>
function handleKeyCommand() {
	return 'not-handled';
}

// @desc   : create an editor state containing text
// @text   : <string>
// @return : <func> callback that returns the editor state
function createEditorState(text) {
	const contentState = ContentState.createFromText(text);
	const editorState = EditorState.createWithContent(contentState);
	return () => editorState;
}

// @desc        : return the raw text from an editor state
// @editorState : <Editor State>
function getTextFromEditorState(editorState) {
	return editorState.getCurrentContent().getPlainText();
}

export default function MyEditor(props) {
	const [editorState, setEditorState] = useState(createEditorState(props.text));
	const dispatch = useDispatch();
	const { cardNumber, decks, deckNumber } = useSelector(state => state);
	const currentDeck = decks[deckNumber];
	const currentCard = currentDeck.cards[cardNumber];

	// @desc : update editor state when the card number changes, the
	//       : deck number changes, or the number of cards in the deck
	//       : changes.
	useEffect(() => {
		if(deckNumber !== null && cardNumber !== null) {
			const text = (props.isFront) ? currentCard.front : currentCard.back;
			setEditorState(createEditorState(text));
		}
	},
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[props.isFront, cardNumber, deckNumber, currentDeck.cards.length]);
	/* 
	 * NOTE: cannot include currentCard.front or currentCard.back in the
	 * dependency array because they change on every keystroke. 
	 */

	// @desc        : update the current card by modifying the deck
	// @editorState : <Editor State> state after being written to
	function updateCurrentCard(editorState) {
		const text = getTextFromEditorState(editorState);
		const updatedCard = { 
			front: props.isFront ? text : currentCard.front,
			back: props.isFront ? currentCard.back : text 
		};
		dispatch(insertCard(deckNumber, cardNumber, updatedCard));
		setEditorState(editorState);
	}

	return (
		<div className='editor-wrapper' onClick={stopPropagation}>
			<Editor 
				editorState={editorState} 
				handleKeyCommand={handleKeyCommand}
				keyBindingFn={getDefaultKeyBinding} 
				onChange={updateCurrentCard} 
			/>
		</div>
	);
}