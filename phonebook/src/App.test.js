import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders contact form', () => {
  const { container, getByText } = render(<App />);
  const linkElement = getByText(/Create Contact/i);
  expect(linkElement).toBeInTheDocument();
  expect(container.firstChild).toMatchInlineSnapshot(`
  
  `)
});

// test('does not render update form', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/Update Contact/i);
//   expect(linkElement).not.toBeInTheDocument();
// });
