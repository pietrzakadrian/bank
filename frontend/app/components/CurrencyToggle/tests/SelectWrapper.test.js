import React from 'react';
import { render } from '@testing-library/react';

import SelectWrapper from '../SelectWrapper';

describe('<ButtonWrapper />', () => {
  it('should render an <div> tag', () => {
    const { container } = render(<SelectWrapper />);
    expect(container.querySelector('div')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<SelectWrapper />);
    expect(container.querySelector('div').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<SelectWrapper id={id} />);
    expect(container.querySelector('div').id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<SelectWrapper attribute="test" />);
    expect(container.querySelector('div[attribute="test"]')).toBeNull();
  });
});
