import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./App.css";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Send username and password
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data); // Handle success response
                navigate('/login'); // Redirect to login page after successful registration
            } else {
                console.error('Registration failed:', data); // Handle registration failure
            }
        } catch (error) {
            console.error('Error:', error); // Handle error response
        }
    };

    return (
        <div className="container">
            <h2 className='insertText mt-4'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group d-flex justify-content-center align-items-center mt-3">
                    <label className="form-label me-2">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className="form-group d-flex justify-content-center align-items-center mt-3">
                    <label className="form-label me-2">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className="form-group d-flex justify-content-center align-items-center mt-3">
                    <label className="form-label me-2">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className='form-input'
                    />
                </div>
                <div className="form-group d-flex justify-content-center align-items-center mt-3">
                    <label className="form-label me-2">Email (optional): </label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <button className="btn btn-secondary" type="submit">Register</button>
                </div>
            </form>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <p>
                    Already have an account? <Link className="loginlink" to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
