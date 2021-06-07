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

	const [prevCardNumber, setPrevCardNumber] = useState(cardNumber);
	const [prevDeck, setPrevDeck] = useState(currentDeck);

	// @desc : update editor state when text changes via new card
	// @todo : fix this to be less complicated, less dependencies, etc.
	useEffect(() => {
		if(prevCardNumber !== cardNumber || prevDeck.name !== currentDeck.name) {
			setPrevCardNumber(cardNumber);
			setPrevDeck(currentDeck);
			setEditorState(createEditorState(props.text));
		}
	}, [props.text]);

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