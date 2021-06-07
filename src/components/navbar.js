import { Link } from 'react-router-dom';

export default function Navbar() {

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container-fluid">

				<div className="navbar-collapse collapse">
					<ul className="navbar-nav me-auto">

						{/* nav links */}
						<li className="nav-item">
							<Link className="nav-link" to='/'>Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to='/login'>Login</Link>
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