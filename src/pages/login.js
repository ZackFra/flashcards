import { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import Navbar from 'components/navbar';

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<>
			<Navbar />
			<Container>
				<Form>
					<Form.Group controlId='username'>
						<Form.Label>Username</Form.Label>
						<Form.Control type='username' placeholder='Enter username...' />
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control type='password' placeholder='Enter password...' />
					</Form.Group>
				</Form>
			</Container>
		</>
	)
}