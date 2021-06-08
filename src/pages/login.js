import { useState } from 'react';
import { Form, Container, Button, Card } from 'react-bootstrap';
import Navbar from 'components/navbar';

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const onChangeUsername = (e) => setUsername(e.target.value);
	const onChangePassword = (e) => setPassword(e.target.value); 

	const onSubmit = (e) => {
		e.preventDefault();
	}

	return (
		<>
			<Navbar />
			<Container className='w-50'>
				<Card className='mt-5'>
					<Card.Body>
						<Form onSubmit={onSubmit}>
							<Form.Group controlId='username' className='mt-2'>
								<Form.Label>Username</Form.Label>
								<Form.Control 
									type='username'
									onChange={onChangeUsername}
									value={username} 
									placeholder='Enter username...' 
								/>
							</Form.Group>
							<Form.Group controlId='password' className='mt-4'>
								<Form.Label>Password</Form.Label>
								<Form.Control 
									type='password' 
									onChange={onChangePassword}
									value={password}
									placeholder='Enter password...' />
							</Form.Group>
							<Button type='submit' className='mt-4 w-100'><strong>Login</strong></Button>
						</Form>
					</Card.Body>
				</Card>
					
			</Container>
		</>
	)
}