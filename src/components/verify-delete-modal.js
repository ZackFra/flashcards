import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { deleteDeck, deleteCard } from '../redux/action-creators/decks';

export default function VerifyDeleteModal(props) {
	const dispatch = useDispatch();

	const deleteFunc = () => {
		if(props.isDeck) {
			dispatch(deleteDeck(props.deckNumber));
		} else {
			dispatch(deleteCard(props.deckNumber, props.cardNumber));
		}
		props.onHide();
	}
	
	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title>Are you sure you want to delete this?</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p className='text-warning'>This action is not reversible.</p>
			</Modal.Body>

			<Modal.Footer>
				<Button variant='primary' onClick={deleteFunc}>
					Yes
				</Button>
				<Button variant='secondary' onClick={props.onHide}>
					No
				</Button>
			</Modal.Footer>
		</Modal>
	)
}