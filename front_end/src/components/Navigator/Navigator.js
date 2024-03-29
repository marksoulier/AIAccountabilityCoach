import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navigator.css';
import logoImage from '../../assets/budget_fox.png'; // Adjust the path based on your file structure
import { getCookie } from '../../utils/cookieUtils'; // Implement getCookie or use a package to get the value


const Navigator = () => {
    let navigate = useNavigate(); // Get the navigate function

    const handleLogout = async () => {
        const csrfToken = getCookie('csrftoken');
        try {
            const response = await fetch('/accounts/logout/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });

            if (response.ok) {
                console.log('Logout successful');
                window.location.href = '/'; // Redirect to the home page, causing a full page reload
            } else {
                console.error('Logout failed with status:', response.status);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <nav className="navigator">
            <div className="logo">
                <img src={logoImage} alt="Logo" className="logo-img" />
            </div>
            <ul className="nav-links">
                <li><NavLink to="/index/dashboard" activeClassName="active">Dashboard</NavLink></li>
                <li><NavLink to="/index/profile" activeClassName="active">Profile</NavLink></li>
                <li><NavLink to="/index/subscribe" activeClassName="active">Subscribe</NavLink></li>
                {/* Logout Button */}
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </ul>
        </nav>
    );
};

export default Navigator;
