import React from 'react';
import { render } from '@testing-library/react';

import Select from 'components/Select';

describe('<Select />', () => {
  it('should render an <select> tag', () => {
    const { container } = render(<Select />);
    expect(container.querySelector('select')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<Select />);
    expect(container.querySelector('select').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<Select attribute="test" />);
    expect(container.querySelector('select[attribute="test"]')).toBeNull();
  });
});
