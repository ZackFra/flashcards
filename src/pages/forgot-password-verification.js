import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import Navbar from 'components/navbar';

export default function ForgotPassword() {
	const [state, setState] = useState({
		username: '',
		password: '',
		verificationCode: ''
	});

	const [error, setError] = useState({message: '', status: false});
	const [success, setSuccess] = useState(false);

	const onChange = (e) => {
		if(error.status) {
			setError({message: '', status: false});
		}
		setState({...state, [e.target.name]: e.target.value});
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await Auth.forgotPasswordSubmit(username, verificationCode, password);
			setSuccess(true);
		} catch(err) {
			setError({message: err.message, status: true });
		}
	}

	const FailAlert = () => (
		<Alert variant='danger'>
			{error.message}
		</Alert>
	)

	const SuccessAlert = () => (
		<Alert variant='success'>
			Password reset! Click <Link to='/login'>here</Link> to login.
		</Alert>
	)
	
	const { username, password, verificationCode } = state;
	return (
		<>
			<Navbar />
			<Container>
				<h1>Reset Password</h1>
				<p>Enter your verification code, your username, and your new password here.</p>
				{error.status ? <FailAlert /> : undefined}
				{success ? <SuccessAlert /> : undefined}
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='verification-code' className='mt-2'>
						<Form.Label>Verification Code</Form.Label>
						<Form.Control 
							type='text' 
							name='verificationCode'
							value={verificationCode} 
							onChange={onChange} 
							placeholder='Enter verification code...' 
						/>
					</Form.Group>
					<Form.Group controlId='verification-username' className='mt-2'>
						<Form.Label>Username</Form.Label>
						<Form.Control 
							type='username'
							name='username' 
							value={username} 
							onChange={onChange} 
							placeholder='Enter username...' 
						/>
					</Form.Group>
					<Form.Group controlId='verification-password' className='mt-2'>
						<Form.Label>New Password</Form.Label>
						<Form.Control 
							type='password'
							name='password'
							value={password} 
							onChange={onChange} 
							placeholder='Enter password...' 
						/>
					</Form.Group>
					<Button className='mt-4' type='submit'>Confirm</Button>
				</Form>
			</Container>

		</>
	)
}