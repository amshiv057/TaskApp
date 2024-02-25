import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';

const Navbaar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        alert("User Logged Out successfully")
        sessionStorage.clear();
        navigate("/")
    };

    const handleSignUp = () => {
        navigate("/signUp")
    };
    return (
        <header>
            <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/home">Task App</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto"> {/* Use ms-auto to push items to the right */}
                            <li className="nav-item">
                                <Button variant="outline-primary" onClick={handleSignUp} className="me-2">SignUP</Button>
                            </li>
                            <li className="nav-item">
                                <Button variant="outline-primary" onClick={handleLogout} className="me-2">Logout</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </Navbar>
        </header>
    );
}

export default Navbaar;