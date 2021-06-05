import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { renameDeck } from '../redux/action-creators/decks';

export default function RenameDeckModal(props) {
	const decks = useSelector(state => state.decks);
	const dispatch = useDispatch();
	const currentDeck = decks[props.deckNumber];
	const onChange = (e) => dispatch(renameDeck(props.deckNumber, e.target.value));
	
	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title>Rename Deck</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<input onChange={onChange}>{currentDeck?.name}</input>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={props.onHide}>Close</Button>
				<Button variant="primary">Save changes</Button>
			</Modal.Footer>
		</Modal>
	)
}