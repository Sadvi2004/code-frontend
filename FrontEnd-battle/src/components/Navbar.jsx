import React, { useState, useContext } from 'react';
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [checked, setChecked] = useState(false);

    const mode = (e) => {
        if (e.target.checked === true) {
            setChecked(!checked);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar">
            <div className="logo-section">
                <Link to='/'>
                    <p className="logo">CodeFE</p>
                    <p className="sub-title-nav">Practice CSS</p>
                </Link>
            </div>
            <input type="radio" className='mode' checked={checked} onClick={mode} />
            {isLoggedIn ? (
                <button onClick={handleLogout} className='bn'>Logout</button>
            ) : (
                <Link to='/signup'><button className='bn'>Login</button></Link>
            )}
        </nav>
    );
}
