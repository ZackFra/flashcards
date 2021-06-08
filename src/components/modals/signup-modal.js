import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const MESSAGE_TYPES = {
	NONE: 0,
	SUCCESS: 1,
	ERROR: 2
};

function isError(code) {
	return code === MESSAGE_TYPES.ERROR;
}

function isSuccess(code) {
	return code === MESSAGE_TYPES.SUCCESS;
}

export default function SignUpModal(props) {
	const [state, setState] = useState({
		username: '',
		password: '',
		confirm: '',
		message: {content: '', type: MESSAGE_TYPES.NONE }
	});

	// @desc : onChange handler for inputs
	const onChange = (e) => setState({...state, [e.target.name]: e.target.value});
	
	// @desc : make API request to finish account creation, set message based on success
	//       : or failure
	const onSubmit = (e) => {
		e.preventDefault();
		// TODO: make API request
		setState({...state, message: {content: 'Account Created!', type: MESSAGE_TYPES.SUCCESS}});
	}

	// @desc : reset the state, close the modal
	const onHide = () => {
		setState({
			username: '', 
			password: '', 
			confirm: '', 
			message: {content: '', type: MESSAGE_TYPES.NONE}
		});
		props.onHide();
	}

	const { username, password, confirm, message } = state; 
	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title>Create an account</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{isSuccess(message.type) ? <Alert variant='success'>{message.content}</Alert> : undefined}
				{isError(message.type) ? <Alert variant='danger'>{message.content}</Alert> : undefined}
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='signup-username' className='mt-2'>
						<Form.Label>Username</Form.Label>
						<Form.Control 
							type='username'
							name='username'
							onChange={onChange}
							value={username} 
							placeholder='Enter username...' 
						/>
					</Form.Group>
					<Form.Group controlId='signup-password' className='mt-4'>
						<Form.Label>Password</Form.Label>
						<Form.Control 
							type='password' 
							name='password'
							onChange={onChange}
							value={password}
							placeholder='Enter password...' />
					</Form.Group>
					<Form.Group controlId='signup-confirm' className='mt-4'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control 
							type='password' 
							name='confirm'
							onChange={onChange}
							value={confirm}
							placeholder='Confirm password...' />
					</Form.Group>
					<Button type='submit' className='mt-4 w-100'><strong>Sign up</strong></Button>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant='primary' onClick={onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}