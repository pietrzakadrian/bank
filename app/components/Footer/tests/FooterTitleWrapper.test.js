import React from 'react';
import { render } from '@testing-library/react';

import FooterTitleWrapper from '../FooterTitleWrapper';

describe('<FooterAlertWrapper />', () => {
  it('should render an <h3> tag', () => {
    const { container } = render(<FooterTitleWrapper />);
    expect(container.querySelector('h3')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<FooterTitleWrapper />);
    expect(container.querySelector('h3').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<FooterTitleWrapper attribute="test" />);
    expect(container.querySelector('h3[attribute="test"]')).toBeNull();
  });
});
