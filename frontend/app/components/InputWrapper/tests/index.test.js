import React from 'react';
import { render } from '@testing-library/react';

import InputWraper from '../index';

describe('<MessageWrapper />', () => {
  it('should render an <input> tag', () => {
    const { container } = render(<InputWraper />);
    expect(container.querySelector('input')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<InputWraper />);
    expect(container.querySelector('input').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<InputWraper attribute="test" />);
    expect(container.querySelector('input[attribute="test"]')).toBeNull();
  });
});
