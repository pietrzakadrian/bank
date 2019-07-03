import React from 'react';
import { render } from '@testing-library/react';

import MessageWrapper from '../MessageWrapper';

describe('<MessageWrapper />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<MessageWrapper />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<MessageWrapper />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<MessageWrapper attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
