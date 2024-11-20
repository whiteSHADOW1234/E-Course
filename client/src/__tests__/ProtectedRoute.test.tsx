import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Use MemoryRouter
import ProtectedRoute from '../components/ProtectedRoute';


test('redirects to login when no user', () => {
    render(
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={<ProtectedRoute user={null} onLogout={() => {}}><div>Protected Content</div></ProtectedRoute>}
            />
            <Route path="/login" element={<div>Login Page</div>} /> {/* Mock a login route */}
          </Routes>
        </MemoryRouter>
      );
      // Check that the user is redirected to the login page
      expect(screen.getByText('Login Page')).toBeInTheDocument();

});



test('renders children when user is logged in', () => {

  render(
    <MemoryRouter initialEntries={['/protected']}> {/* Use initialEntries for ProtectedRoute */}
        <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute user={{ username: 'testuser', password: 'password' }} onLogout={() => {}}>
              <div>Protected Content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Protected Content')).toBeInTheDocument();  // Correct test
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();

});