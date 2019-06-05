import React from 'react';
import { render } from 'react-testing-library';

import ImageWrapper from '../ImageWrapper';

describe('<HeaderWrapper />', () => {
  it('should render an <header> tag', () => {
    const { container } = render(<ImageWrapper />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<ImageWrapper />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<ImageWrapper attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
