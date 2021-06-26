import { Modal } from 'react-bootstrap';

export default function SavingDataModal(props) {
	
	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title>Saving {props.dataName}, please wait</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				...
			</Modal.Body>
		</Modal>
	)
}