import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import { logout } from 'utils/user';

export default function LoginLogoutLink() {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const logoutBtn = useMemo(() => {
		const onLogout = () => logout(dispatch);
		return <Button onClick={onLogout} variant='primary' className='nav-link'>Logout</Button> 
	}, [dispatch]);

	const loginLink = useMemo(() => { 
		return <Link className="nav-link btn btn-primary" to='/login'>Login</Link>
	}, [])
	
	const [btn, setBtn] = useState(user.isAuth ? logoutBtn : loginLink)

	useEffect(() => {
		setBtn(user.isAuth ? logoutBtn : loginLink);
	}, [user.isAuth, logoutBtn, loginLink])

	return btn;
}