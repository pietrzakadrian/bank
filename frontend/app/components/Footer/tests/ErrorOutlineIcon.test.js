import React from 'react';
import { render } from '@testing-library/react';

import ErrorOutlineIcon from '../ErrorOutlineIconWrapper';

describe('<ErrorOutlineIcon />', () => {
  it('should not adopt an invalid attribute', () => {
    const { container } = render(<ErrorOutlineIcon attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
