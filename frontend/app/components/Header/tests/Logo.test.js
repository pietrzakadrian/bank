import React from 'react';
import { render } from '@testing-library/react';

import Logo from '../Logo';

describe('<Logo />', () => {
  it('should render an <img> tag', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('img')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('img').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<Logo attribute="test" />);
    expect(container.querySelector('img[attribute="test"]')).toBeNull();
  });
});
