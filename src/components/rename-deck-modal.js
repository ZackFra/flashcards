import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { renameDeck } from '../redux/action-creators/decks';

export default function RenameDeckModal(props) {
	const decks = useSelector(state => state.decks);;
	const dispatch = useDispatch();
	const currentDeck = decks[props.deckNumber];
	const [tempName, setTempName] = useState(currentDeck?.name)
	const onChange = (e) => setTempName(e.target.value);
	const saveName = () => dispatch(renameDeck(props.deckNumber, tempName));
	const onHide = () => {
		setTempName("");
		props.onHide();
	}
	const onShow = () => setTempName(currentDeck?.name);
	
	return (
		<Modal show={props.show} onShow={onShow}>
			<Modal.Header>
				<Modal.Title>Rename Deck</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<input onChange={onChange} value={tempName} />
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>Close</Button>
				<Button variant="primary" onClick={saveName}>Save changes</Button>
			</Modal.Footer>
		</Modal>
	)
}