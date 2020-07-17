import React from 'react';
import { render } from '@testing-library/react';

import NavigateBackIcon from '../index';

describe('<NavigateBackIcon />', () => {
  it('should not adopt an invalid attribute', () => {
    const { container } = render(<NavigateBackIcon attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
