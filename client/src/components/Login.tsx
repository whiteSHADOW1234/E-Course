// client/src/components/Login.tsx
import React, { useState } from 'react';
import authService from '../service/authService';
import { useNavigate, Link } from 'react-router-dom';

interface LoginProps {
    onLogin: (user: { username: string; password: string; isAdmin: boolean }) => void; // Define the user type passed from the parent
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Set error as a string or null
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await authService.login(username, password); // Call your login service
            onLogin({ ...user, isAdmin: user.isAdmin ?? false }); // Ensure isAdmin is always a boolean
            navigate("/");

        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please try again."); // Set a more user-friendly error message
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>E-COURSE</h1>
                <h3>Website to enroll NCU expresso course</h3>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <Link to="/register" className="register-link">
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    );
};

export default Login;
