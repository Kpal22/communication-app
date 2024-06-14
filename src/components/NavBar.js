import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import UserStorage from "../database/UserStorage";

const NavBar = () => {
    const navigate = useNavigate();

    const logout = () => {
        UserStorage.clearSession();
        navigate("/welcome");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => "nav-link fs-4" + (isActive ? " active" : "")} to="/chat">Group Chat</NavLink>
                            </li>
                            <li className="nav-item d-flex align-items-center mx-2">|</li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => "nav-link fs-4" + (isActive ? " active" : "")} to="/users">Manage Users</NavLink>
                            </li>
                            <li className="nav-item d-flex align-items-center mx-2">|</li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => "nav-link fs-4" + (isActive ? " active" : "")} to="/documents">Manage Documents</NavLink>
                            </li>
                            <li className="nav-item d-flex align-items-center mx-2">|</li>
                            <li className="nav-item">
                                <button className="nav-link fs-4" onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default NavBar;
