import { useState } from 'react';
import { Form, Container, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import Navbar from 'components/navbar';
import SignUpModal from 'components/modals/signup-modal';
import { loginUser } from 'redux/action-creators/user';

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


export default function LoginPage() {
	const [state, setState] = useState({
		username: '',
		password: '',
		showModal: false,
		message: {content: '', type: MESSAGE_TYPES.NONE }
	});
	const { username, password, showModal, message } = state;

	const dispatch = useDispatch();

	// @desc : onChange event handler for form controls
	const onChange = (e) => setState({...state, [e.target.name]: e.target.value});
	
	// @desc: functions to show / hide the sign up modal
	const showSignUpModal = () => setState({...state, showModal: true });
	const hideSignUpModal = () => setState({...state, showModal: false});

	// @desc : authenticate a user given their credentials
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = await Auth.signIn(username, password);
			const successMessage = {
				content: 'Login successful!',
				type: MESSAGE_TYPES.SUCCESS
			}
			dispatch(loginUser(user));
			setState({...state, message: successMessage});
		} catch(err) {
			if(err.message) {
				const failMessage = {
					content: err.message,
					type: MESSAGE_TYPES.ERROR
				}
				setState({...state, message: failMessage });
			}
		}
	}

	// @desc : generate an alert when a login attempt fails
	const FailAlert = () => (
		<Alert variant='danger' className='mt-3'>{message.content}</Alert>
	)

	// redirect on successful login
	if(isSuccess(message.type)) {
		return <Redirect to='/study' />
	}

	return (
		<>
			<Navbar />
			<SignUpModal show={showModal} onHide={hideSignUpModal} />
			<Container className='w-50'>
				{isError(message.type) ? <FailAlert /> : undefined}
				<Card className='mt-3'>
					<Card.Body>
						<Form onSubmit={onSubmit}>
							<Form.Group controlId='username' className='mt-2'>
								<Form.Label>Username</Form.Label>
								<Form.Control 
									type='username'
									name='username'
									onChange={onChange}
									value={username} 
									placeholder='Enter username...' 
								/>
							</Form.Group>
							<Form.Group controlId='password' className='mt-4'>
								<Form.Label>Password</Form.Label>
								<Form.Control 
									type='password' 
									name='password'
									onChange={onChange}
									value={password}
									placeholder='Enter password...' />
							</Form.Group>
							<Button type='submit' className='mt-4 w-100'><strong>Login</strong></Button>
						</Form>
						<p className='mb-0 mt-4'><Link to='/forgot-password'>Forgot password?</Link></p>
					</Card.Body>
				</Card>
				<p className='text-info mt-2'>Don't have an account? <Button variant='link' onClick={showSignUpModal} onHide={hideSignUpModal}>Sign up.</Button></p>
			</Container>
		</>
	)
}