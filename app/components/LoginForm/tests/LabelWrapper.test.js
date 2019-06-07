import React from 'react';
import { render } from 'react-testing-library';

import LabelWrapper from '../LabelWrapper';

describe('<LabelWrapper />', () => {
  it('should render an <label> tag', () => {
    const { container } = render(<LabelWrapper />);
    expect(container.querySelector('label')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<LabelWrapper />);
    expect(container.querySelector('label').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<LabelWrapper attribute="test" />);
    expect(container.querySelector('label[attribute="test"]')).toBeNull();
  });
});
