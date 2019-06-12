import React from 'react';
import { render } from '@testing-library/react';

import NavigateNextIcon from '../index';

describe('<NavigateNextIcon />', () => {
  it('should not adopt an invalid attribute', () => {
    const { container } = render(<NavigateNextIcon attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
