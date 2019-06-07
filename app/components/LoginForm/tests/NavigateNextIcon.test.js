import React from 'react';
import { render } from 'react-testing-library';

import NavigateNextIcon from '../NavigateNextIcon';

describe('<NavigateNextIcon />', () => {
  it('should render an <svg> tag', () => {
    const { container } = render(<NavigateNextIcon />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<NavigateNextIcon />);
    expect(container.querySelector('svg').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<NavigateNextIcon attribute="test" />);
    expect(container.querySelector('svg[attribute="test"]')).toBeNull();
  });
});
