import React from 'react';
import { render } from '@testing-library/react';

import InformationWrapper from '../InformationWrapper';

describe('<InformationWrapper />', () => {
  it('should render an <p> tag', () => {
    const { container } = render(<InformationWrapper />);
    expect(container.querySelector('p')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<InformationWrapper />);
    expect(container.querySelector('p').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<InformationWrapper attribute="test" />);
    expect(container.querySelector('p[attribute="test"]')).toBeNull();
  });
});
