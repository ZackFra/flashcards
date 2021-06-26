import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { logout } from 'utils/user';

export default function FailedToLoadModal(props) {

	const hideModal = () => {
		props.onHide();
	}

	const dispatch = useDispatch();

	useEffect(() => {
		if(props.show) {
			logout(dispatch);
		}
	}, [dispatch, props.show])
	
	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title>{props.failedData} failed to load.</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				User has been logged out.
			</Modal.Body>

			<Modal.Footer>
				<Button variant='primary' onClick={hideModal}>
					Ok
				</Button>
			</Modal.Footer>
		</Modal>
	)
}