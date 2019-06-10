import React from 'react';
import { render } from '@testing-library/react';

import FooterAlertWrapper from '../FooterAlertWrapper';

describe('<FooterAlertWrapper />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<FooterAlertWrapper />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<FooterAlertWrapper />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<FooterAlertWrapper attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
