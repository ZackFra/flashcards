import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

export default function VerifyDeleteModal(props) {

	const deleteFunc = () => {
		props.onVerify();
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