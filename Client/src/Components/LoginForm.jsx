import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const LoginForm = () => {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/api/auth/login', formData);
            alert(response.data.message); // Assuming your response contains a 'message' field
            const { role, userId} = response.data;

            // Navigate based on the user's role
            if (role === 'admin')  {
                navigate(`/admin/${userId}`);
            } else if (role === 'distributor') {
                navigate(`/distributorPanel`);
                // navigate(`/distributorPanel/${userId}`);
            } else if (role === 'adopter') {
                navigate(`/adopt`);
            } else if (role === 'vet') {
                navigate(`/vetPanel`);
                // navigate(`/vetPanel/${userId}`);
            }
            else if (role === 'daycare') {
                navigate(`/daycarePanel`);
                // navigate(`/daycare/${userId}`);
            }


        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                alert(err.response.data);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

     
      const handleSignupNavigate = () => {
        navigate('/signup'); 
    };

    return (
        <div className="login-page-container">
            {/* Hero Section on the Left */}
            <div className="login-hero-section">
                <div className="login-hero-content">
                    <h1>Welcome Back to Pawprint</h1>
                    <p>Login to continue your journey.</p>
                </div>
            </div>

            {/* Login form on the Right */}
            <div className="login-form-section">
                <div className="login-card">
                    <div className="login-card-body">
                        <h2 className="form-name">Sign In</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="userID"
                                placeholder="User ID"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className="login-button">Login</button>
                        </form>
                        <p>Don't have an account? <span onClick={handleSignupNavigate} className="signup-link">Signup</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
