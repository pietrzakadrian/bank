import React from 'react';
import { render } from 'react-testing-library';

import SubheaderWrapper from '../SubheaderWrapper';

describe('<SubheaderWrapper />', () => {
  it('should render an <header> tag', () => {
    const { container } = render(<SubheaderWrapper />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<SubheaderWrapper />);
    expect(container.querySelector('header').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<SubheaderWrapper attribute="test" />);
    expect(container.querySelector('header[attribute="test"]')).toBeNull();
  });
});
