import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import authService from '../service/authService';

jest.mock('../service/authService');

test('renders login form', () => {
  // ... (no changes in this test)
});


test('calls login service on submit', async () => {
  const mockOnLogin = jest.fn();
  (authService.login as jest.Mock).mockResolvedValue({ username: 'testuser', isAdmin: false }); // Mock *before* rendering

  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login onLogin={mockOnLogin} />} />
      </Routes>
    </MemoryRouter>
  );

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });

  expect(authService.login).toHaveBeenCalledWith('testuser', 'password');
  expect(mockOnLogin).toHaveBeenCalledWith({ username: 'testuser', isAdmin: false });
});

test('handles login error', async () => {
  const mockOnLogin = jest.fn();
  (authService.login as jest.Mock).mockRejectedValue(new Error('Login failed')); // Mock *before* rendering

  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login onLogin={mockOnLogin} />} />
      </Routes>
    </MemoryRouter>
  );

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });

  expect(screen.getByText('Login failed. Please try again.')).toBeVisible();  // Use getByText for synchronous assertions
});