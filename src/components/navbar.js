import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import { logoutUser } from 'redux/action-creators/user';
import './navbar.css'

export default function Navbar() {
	
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const onLogout = () => {
		try {
			Auth.signOut();
			dispatch(logoutUser());
		} catch(err) {
			// ???
		}
	}

	const LoginLogoutLink = () => {
		if(user.isAuth) {
			return (
				<li className="nav-item">
					<Button onClick={onLogout} variant='primary' className='nav-link'>Logout</Button>
				</li>
			)
		}

		return (
			<li className="nav-item">
				<Link className="nav-link btn btn-primary" to='/login'>Login</Link>
			</li>
		)
	}

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-primary">
			<div className="container-fluid">

				<div className="navbar-container">
					<ul className="navbar-nav navbar-left">
						{/* nav links */}
						<li className="nav-item">
							<Link className="nav-link" to='/'>Home</Link>
						</li>
					</ul>

					<ul className='navbar-nav navbar-right'>
						<LoginLogoutLink />
					</ul>
				</div>

			</div>
		</nav>
	)
}