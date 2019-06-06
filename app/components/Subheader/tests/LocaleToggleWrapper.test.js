import React from 'react';
import { render } from 'react-testing-library';

import LocaleToggleWrapper from '../LocaleToggleWrapper';

describe('<LocaleToggleWrapper />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<LocaleToggleWrapper />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<LocaleToggleWrapper />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<LocaleToggleWrapper attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
