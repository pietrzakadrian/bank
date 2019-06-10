import React from 'react';
import { render } from '@testing-library/react';

import NavigateNextIcon from '../index';

describe('<NavigateNextIcon />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<NavigateNextIcon />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<NavigateNextIcon />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<NavigateNextIcon attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
