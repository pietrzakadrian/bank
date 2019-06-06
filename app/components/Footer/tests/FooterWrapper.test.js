import React from 'react';
import { render } from 'react-testing-library';

import FooterWrapper from '../FooterWrapper';

describe('<FooterAlertWrapper />', () => {
  it('should render an <footer> tag', () => {
    const { container } = render(<FooterWrapper />);
    expect(container.querySelector('footer')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<FooterWrapper />);
    expect(container.querySelector('footer').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<FooterWrapper attribute="test" />);
    expect(container.querySelector('footer[attribute="test"]')).toBeNull();
  });
});
