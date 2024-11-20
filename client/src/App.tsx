// client/src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Calendar from './components/Calendar';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import authService from './service/authService';

// Define the structure of a user object
interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

const App: React.FC = () => {
  // State for the current user
  const [user, setUser] = useState<User | null>(null);
  // const location = useLocation();

  useEffect(() => {
    const loggedInUser = authService.getCurrentUser() as User | null;
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = (user: User): void => {
    console.log('App handleLogin: User logged in:', user);
    setUser(user);
  };

  const handleLogout = (): void => {
    console.log('App handleLogout: User logging out...');
    authService.logout();
    setUser(null);
  };
  console.log('App render: Current user:', user);

  return (
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user} onLogout={handleLogout}>
                {user && <Calendar user={user} />}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
  );
};

export default App;
