import React from 'react';
import { render } from 'react-testing-library';

import PrivacyWrapper from '../PrivacyWrapper';

describe('<PrivacyWrapper />', () => {
  it('should render an <button> tag', () => {
    const { container } = render(<PrivacyWrapper />);
    expect(container.querySelector('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<PrivacyWrapper />);
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<PrivacyWrapper attribute="test" />);
    expect(container.querySelector('button[attribute="test"]')).toBeNull();
  });
});
