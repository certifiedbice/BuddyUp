import React from 'react';
import { render } from '@testing-library/react';
import Register from './Register';
import Json from 'enzyme-to-Json';

it('should render the entire form', () => {
    const { getByText } = render(<Register />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});