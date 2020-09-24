import React from 'react';
import React.Dom from 'react';

test('renders a Registration form', () => {
    const { getByText } = render(<Register/>);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });