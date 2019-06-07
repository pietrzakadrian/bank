import React from 'react';
import { render } from 'react-testing-library';

import LoginFormWrapper from '../LoginFormWrapper';

describe('<InputWrapper />', () => {
  it('should render an <main> tag', () => {
    const { container } = render(<LoginFormWrapper />);
    expect(container.querySelector('main')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<LoginFormWrapper />);
    expect(container.querySelector('main').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<LoginFormWrapper attribute="test" />);
    expect(container.querySelector('main[attribute="test"]')).toBeNull();
  });
});
