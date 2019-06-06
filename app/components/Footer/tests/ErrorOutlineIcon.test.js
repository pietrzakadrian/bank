import React from 'react';
import { render } from 'react-testing-library';

import ErrorOutlineIcon from '../ErrorOutlineIcon';

describe('<ErrorOutlineIcon />', () => {
  it('should render an <svg> tag', () => {
    const { container } = render(<ErrorOutlineIcon />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<ErrorOutlineIcon />);
    expect(container.querySelector('svg').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<ErrorOutlineIcon attribute="test" />);
    expect(container.querySelector('svg[attribute="test"]')).toBeNull();
  });
});
