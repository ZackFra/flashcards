import { Modal, Button } from 'react-bootstrap';

export default function FailedToLoadModal(props) {

	const hideModal = () => {
		props.onHide();
	}

	const tryAgain = () => {
		props.onHide();
		props.save();
	}

	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title>{props.failedData} failed to save.</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				Try again?
			</Modal.Body>

			<Modal.Footer>
				<Button variant='primary' onClick={hideModal}>
					Cancel
				</Button>
				<Button variant='secondary' onClick={tryAgain}>
					Ok
				</Button>
			</Modal.Footer>
		</Modal>
	)
}