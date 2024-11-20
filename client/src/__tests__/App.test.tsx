import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // Import MemoryRouter
import App from '../App';  // Import your App component

test('renders App component without crashing', () => {
  render(
    <MemoryRouter> {/* Use MemoryRouter instead of BrowserRouter */}
      <App />
    </MemoryRouter>
  );
  // You can add more specific assertions here if needed
  // For example, check for elements that should be present on the initial route
});