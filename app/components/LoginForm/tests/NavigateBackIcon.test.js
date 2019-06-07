import React from 'react';
import { render } from 'react-testing-library';

import NavigateBackIcon from '../NavigateBackIcon';

describe('<NavigateBackIcon />', () => {
  it('should render an <svg> tag', () => {
    const { container } = render(<NavigateBackIcon />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<NavigateBackIcon />);
    expect(container.querySelector('svg').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<NavigateBackIcon attribute="test" />);
    expect(container.querySelector('svg[attribute="test"]')).toBeNull();
  });
});
