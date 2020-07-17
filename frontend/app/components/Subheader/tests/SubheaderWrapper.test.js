import React from 'react';
import { render } from '@testing-library/react';

import SubheaderWrapper from '../SubheaderWrapper';

describe('<TitleWrapper />', () => {
  it('should render an <section> tag', () => {
    const { container } = render(<SubheaderWrapper />);
    expect(container.querySelector('section')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<SubheaderWrapper />);
    expect(container.querySelector('section').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<SubheaderWrapper attribute="test" />);
    expect(container.querySelector('section[attribute="test"]')).toBeNull();
  });
});
