import React from 'react';
import { render } from 'react-testing-library';

import InformationWrapper from '../InformationWrapper';

describe('<InformationWrapper />', () => {
  it('should render an <section> tag', () => {
    const { container } = render(<InformationWrapper />);
    expect(container.querySelector('section')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<InformationWrapper />);
    expect(container.querySelector('section').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<InformationWrapper attribute="test" />);
    expect(container.querySelector('section[attribute="test"]')).toBeNull();
  });
});
