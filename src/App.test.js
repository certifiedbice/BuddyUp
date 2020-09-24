import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('it renders without crashing', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
