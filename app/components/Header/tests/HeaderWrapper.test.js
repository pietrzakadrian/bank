import React from 'react';
import { render } from 'react-testing-library';

import HeaderWrapper from '../HeaderWrapper';

describe('<HeaderWrapper />', () => {
  it('should render an <header> tag', () => {
    const { container } = render(<HeaderWrapper />);
    expect(container.querySelector('header')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<HeaderWrapper />);
    expect(container.querySelector('header').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<HeaderWrapper attribute="test" />);
    expect(container.querySelector('header[attribute="test"]')).toBeNull();
  });
});
