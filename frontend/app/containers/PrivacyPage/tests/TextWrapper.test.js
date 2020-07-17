import React from 'react';
import { render } from '@testing-library/react';

import TextWrapper from '../TextWrapper';

describe('<TextWrapper />', () => {
  it('should have a class attribute', () => {
    const { container } = render(<TextWrapper />);
    expect(container.querySelector('p').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<TextWrapper attribute="test" />);
    expect(container.querySelector('p[attribute="test"]')).toBeNull();
  });
});
