import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Use MemoryRouter
import Register from '../components/Register';
import authService from '../service/authService';

jest.mock('../service/authService');

test('renders registration form', () => {
  render(
    <MemoryRouter initialEntries={['/register']}> {/* MemoryRouter and initialEntries */}
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});

test('calls register service on submit', async () => {
  render(
    <MemoryRouter initialEntries={['/register']}>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </MemoryRouter>
  );

    await act(async () => {   // Correct usage of act for asynchronous actions
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });


    expect(authService.register).toHaveBeenCalledWith({ username: 'newuser', password: 'password' });
});

test('handles registration error', async () => {
  (authService.register as jest.Mock).mockRejectedValue(new Error('Registration failed')); // Mock before render

  render(
    <MemoryRouter initialEntries={['/register']}> {/* Use MemoryRouter */}
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </MemoryRouter>
  );

  await act(async () => { // Wrap in act
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'existinguser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
  });


    expect(screen.getByText('Registration failed')).toBeVisible(); // Use getByText for synchronous assertions

});