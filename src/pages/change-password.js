import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'components/navbar';

export default function ChangePassword() {
	const [error, setError] = useState({message: '', status: false});
	const [state, setState] = useState({
		password: '',
		newPassword: ''
	});
	const [success, setSuccess] = useState(false);

	// @desc : event-handler for form controls
	const onChange = (e) => {
		if(error.status || success) {
			setError({message: '', status: false});
			setSuccess(false);
		}
		setState({...state, [e.target.name]: e.target.value});
	}

	// @desc : attempt to change the user's password, set an error message if fails
	const onSubmit = async (e) => {
		e.preventDefault();
		if(success) {
			setSuccess(false);
		}

		try {
			const user = await Auth.currentAuthenticatedUser();
			await Auth.changePassword(user, password, newPassword);
			setError({message: '', status: false});
			setSuccess(true);
		} catch(err) {
			setError({message: 'Incorrect password.', status: true });
		}
	}

	/* alerts */
	const FailAlert = () => (
		<Alert variant='danger'>
			{error.message}
		</Alert>
	)

	const SuccessAlert = () => (
		<Alert variant='success'>
			Password changed successfully!
		</Alert>
	)

	// if no one logged in, redirect to login page
	const user = useSelector(state => state.user);
	if(!user.isAuth) {
		return <Redirect to='/login' />
	}


	const { password, newPassword } = state;
	return (
		<>
			<Navbar />
			<Container>
				<h1>Change password</h1>
				<p>Enter your current password and the new password you want to change it to.</p>
				{success ? <SuccessAlert /> : undefined}
				{error.status ? <FailAlert /> : undefined}
				<Form onSubmit={onSubmit}>
					<Form.Group controlId='change-password'>
						<Form.Label>Current Password</Form.Label>
						<Form.Control 
							type='password' 
							name='password'
							value={password} 
							onChange={onChange} 
							placeholder='Enter current password...' 
						/>
					</Form.Group>
					<Form.Group controlId='change-password-new'>
						<Form.Label>New Password</Form.Label>
						<Form.Control 
							type='password'
							name='newPassword'
							value={newPassword} 
							onChange={onChange} 
							placeholder='Enter new password...' 
						/>
					</Form.Group>
					<Button className='mt-2' type='submit'>Done</Button>
				</Form>
			</Container>

		</>
	)
}