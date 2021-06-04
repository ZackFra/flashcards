import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setDeckModalIsVisible } from '../redux/action-creators/deckModalIsVisible';

export default function Navbar() {
	const dispatch = useDispatch();
	function spawnDeckModal() {
		dispatch(setDeckModalIsVisible(true));
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container-fluid">

				<div className="navbar-collapse collapse">
					<ul className="navbar-nav me-auto">

						{/* button to spawn deck modal */}
						<li className='nav-item d-flex align-items-center'>
							<button className='btn btn-primary d-flex align-items-center' onClick={spawnDeckModal}>
								Deck
							</button>
						</li>

						{/* nav links */}
						<li className="nav-item">
							<Link className="nav-link" to='/'>Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to='/logout'>Logout</Link>
						</li>
					</ul>
				</div>

			</div>
		</nav>
	)
}