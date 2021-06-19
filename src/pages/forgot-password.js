import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import Navbar from 'components/navbar';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [sent, setSent] = useState(false);
	const [error, setError] = useState({message: '', status: false});
	const onChange = (e) => {
		if(error.status || sent) {
			setError({message: '', status: false});
			setSent(false);
		}
		setEmail(e.target.value);
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await Auth.forgotPassword(email);
			setError({message: '', status: false});
			setSent(true);
		} catch(err) {
			if(err.message === 'Username cannot be empty') {
				setError({message: 'Email cannot be blank', status: true});
			} else {
				setError({message: err.message, status: true });
			}
		}
	}

	const FailAlert = () => (
		<Alert variant='danger'>
			{error.message}
		</Alert>
	)
	
	// redirect to /forgot-password-verification on success
	if(sent) {
		return <Redirect to='/forgot-password-verification' />
	}
	
	return (
		<>
			<Navbar />
			<Container>
				<h1>Forgot your password?</h1>
				<p>Enter the email associated with your account and we'll send you a reset link.</p>
				{error.status ? <FailAlert /> : undefined}
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='forgot-password-email'>
						<Form.Label>Email</Form.Label>
						<Form.Control type='email' value={email} onChange={onChange} placeholder='swiggityswag@cashmoney.com' />
					</Form.Group>
					<Button className='mt-2' type='submit'>Send!</Button>
				</Form>
			</Container>

		</>
	)
}