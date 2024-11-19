// client/src/components/Register.tsx
import React, { useState, FormEvent } from 'react';
import authService from '../service/authService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Error is either a string or null
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page reload
    try {
      await authService.register({ username, password });
      console.log("Registration successful!");
      navigate('/login');
    } catch (err: any) { // Use `any` to handle dynamic error types
      console.error("Registration failed:", err);
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>E-COURSE</h1>
        <h3>Website to enroll NCU expresso course</h3>
        <form onSubmit={handleRegister} className="login-form">
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
