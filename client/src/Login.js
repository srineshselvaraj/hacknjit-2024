import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from './UserContext';
import './App.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const { setUsername: setGlobalUsername } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) { // Check if the response is successful
                console.log(data); // Handle success response (e.g., show a message)
                setGlobalUsername(username);
                localStorage.setItem('token', data.token);
                navigate('/'); // Redirect to home page after successful login
            } else {
                console.error('Login failed:', data); // Handle login failure
            }
        } catch (error) {
            console.error('Error:', error); // Handle error response
        }
    };

    return (
        <div className='container'>
            <h2 className="insertText mt-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group d-flex justify-content-center align-items-center mt-3">
                    <label className="form-label me-2">Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                    </div>
                    <div className="form-group d-flex justify-content-center align-items-center mt-3">
                    <label className="form-label me-2">Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <div className="d-flex justify-content-center align-items-center mt-3">
                    <button className="btn" type="submit">Login</button>
                </div>
            </form>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <p>
                    Don't have an account? <Link className="loginlink" to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
