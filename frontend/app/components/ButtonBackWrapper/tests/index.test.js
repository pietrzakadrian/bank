import React from 'react';
import { render } from '@testing-library/react';

import ButtonBackWrapper from '../index';

describe('<ButtonBackWrapper />', () => {
  it('should render an <button> tag', () => {
    const { container } = render(<ButtonBackWrapper />);
    expect(container.querySelector('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<ButtonBackWrapper />);
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<ButtonBackWrapper id={id} />);
    expect(container.querySelector('button').id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<ButtonBackWrapper attribute="test" />);
    expect(container.querySelector('button[attribute="test"]')).toBeNull();
  });
});
