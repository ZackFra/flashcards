import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { setDeckModalIsVisible } from '../redux/action-creators/deckModalIsVisible'; 
import { setCurrentDeckName } from '../redux/action-creators/currentDeck';

import Flashcard from './flashcard';

function EditButton(props) {
	if(!props.editing) {
		return <Button onClick={props.edit}>Edit</Button>
	}
	return <Button onClick={props.done}>Done</Button>
}

function ModalTitle(props) {
	if(!props.editing) {
		return props.title;
	}
	return <input className='deck-modal-title' value={props.title} onChange={props.onChange} />
}

function DeckModal() {
	const { 
		deckModalIsVisible,
		currentDeck
	} = useSelector(state => state);

	const dispatch = useDispatch();
	function closeDeckModal() {
		dispatch(setDeckModalIsVisible(false));
	}

	const [editingDeck, setEditingDeck] = useState(false);
	const [deckName, setDeckName] = useState(currentDeck.name);
	const turnOnEditMode = () => setEditingDeck(true);
	const turnOffEditMode = () => {
		dispatch(setCurrentDeckName(deckName));
		setEditingDeck(false);
	}
	const changeDeckName = (e) => setDeckName(e.target.value);

	return (
		<Modal
			size="lg"
			animation={true}
			show={deckModalIsVisible}
			centered
		>
			<Modal.Header>
			<Modal.Title>
				<ModalTitle editing={editingDeck} title={deckName} onChange={changeDeckName}/>
			</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<h4>Card</h4>
			<Flashcard />
			</Modal.Body>
			<Modal.Footer>
				<EditButton editing={editingDeck} edit={turnOnEditMode} done={turnOffEditMode} />
				<Button onClick={closeDeckModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeckModal;