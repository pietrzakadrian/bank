import React from 'react';
import { render } from 'react-testing-library';

import InputWrapper from '../InputWrapper';

describe('<InputWrapper />', () => {
  it('should render an <input> tag', () => {
    const { container } = render(<InputWrapper />);
    expect(container.querySelector('input')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<InputWrapper />);
    expect(container.querySelector('input').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<InputWrapper attribute="test" />);
    expect(container.querySelector('input[attribute="test"]')).toBeNull();
  });
});
