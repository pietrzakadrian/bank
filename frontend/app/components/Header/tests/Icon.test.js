import React from 'react';
import { render } from '@testing-library/react';

import Icon from '../Icon';

describe('<Logo />', () => {
  it('should render an <img> tag', () => {
    const { container } = render(<Icon />);
    expect(container.querySelector('img')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<Icon />);
    expect(container.querySelector('img').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<Icon attribute="test" />);
    expect(container.querySelector('img[attribute="test"]')).toBeNull();
  });
});
