import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import { putDecks } from 'api';

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

const emptyState = {
	email: '',
	username: '',
	password: '',
	confirm: '',
	message: {content: '', type: MESSAGE_TYPES.NONE }
}

export default function SignUpModal(props) {
	const [state, setState] = useState(emptyState);

	// @desc : onChange handler for inputs
	const onChange = (e) => setState({...state, [e.target.name]: e.target.value});
	
	// @desc : make API request to finish account creation, set message based on success
	//       : or failure
	const onSubmit = async (e) => {
		e.preventDefault();

		// default to type being error, will change
		// to SUCCESS upon well... success
		let content, type = MESSAGE_TYPES.ERROR;
		if(password !== confirm) {
			content = 'Passwords do not match';
		} else if(email.length === 0) {
			content = 'Email cannot be blank'
		} else {
			try {
				// TODO : verify email is valid
				await Auth.signUp({
					username,
					password,
					attributes: {
						email
					}
				});
				content = 'Account created!';
				type = MESSAGE_TYPES.SUCCESS;
			} catch(err) {
				if(err.message) {
					content = err.message;
				} else {
					content = 'Unexpected error';
				}
			}
		}

		setState({...state, message: { content, type }});
	}

	// @desc : reset the state, close the modal
	const onHide = () => {
		setState(emptyState);
		props.onHide();
	}

	const SuccessAlert = () => (
		<>
			<Alert variant='info'>
				Check your email for a confirmation link.
				When you are finished, you can <Button onClick={onHide} variant='link' className='p-0'>log in</Button>.
			</Alert>
			<Alert variant='success'>
				{message.content}
			</Alert>
		</>
	)

	const FailAlert = () => (
		<Alert variant='danger'>{message.content}</Alert>
	)

	const { email, username, password, confirm, message } = state; 
	return (
		<Modal show={props.show}>
			<Modal.Header>
				<Modal.Title>Create an account</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{isSuccess(message.type) ? <SuccessAlert /> : undefined}
				{isError(message.type) ? <FailAlert /> : undefined}
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='signup-email' className='mt-2'>
						<Form.Label>Email</Form.Label>
						<Form.Control 
							type='email'
							name='email'
							onChange={onChange}
							value={email} 
							placeholder='Enter email...' 
						/>
					</Form.Group>
					<Form.Group controlId='signup-username' className='mt-4'>
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