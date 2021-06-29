import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

import { loginUser } from 'redux/action-creators/user';
import Study from 'pages/study';
import Login from 'pages/login';
import ForgotPassword from 'pages/forgot-password';
import ForgotPasswordVerification from 'pages/forgot-password-verification';
import ChangePassword from 'pages/change-password';

export default function Routes() {
	const dispatch = useDispatch();

	const [isAuthenticating, setIsAuthenticating] = useState(true);

	// upon render, authenticate the user, do not render until
	// user is authenticated
	useEffect( () => { 
		async function authenticate() {
			try {
				const user = await Auth.currentAuthenticatedUser();
				dispatch(loginUser(user));
			} catch(err) {
				// no user, carry on
			} finally {
				setIsAuthenticating(false);
			}
		}

		authenticate();
	}, [dispatch] );

	const user = useSelector(state => state.user);
	return (
		!isAuthenticating &&
		<Router>
			<Switch>
				<Route exact path='/'>
					{user.isAuth ? <Redirect to='/study' /> : <Redirect to='/login' />}
				</Route>
				<Route exact path='/login'>
					{user.isAuth ? <Redirect to='/study' /> : <Login />}
				</Route>
				<Route exact path='/study'>
					<Study />
				</Route>
				<Route exact path='/forgot-password'>
					<ForgotPassword />
				</Route>
				<Route exact path='/forgot-password-verification'>
					<ForgotPasswordVerification />
				</Route>
				<Route exact path='/change-password'>
					<ChangePassword />
				</Route>

				<Route>
					{/* Not found */}
				</Route>
			</Switch>
		</Router>
	);
}