import React from 'react';
import { render } from 'react-testing-library';

import FooterTextWrapper from '../FooterTextWrapper';

describe('<FooterTextWrapper />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<FooterTextWrapper />);
    expect(container.querySelector('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<FooterTextWrapper />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<FooterTextWrapper attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
