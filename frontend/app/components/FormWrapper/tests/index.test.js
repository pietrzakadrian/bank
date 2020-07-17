/**
 *
 * Tests for FormWrapper
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import FormWrapper from '../index';

describe('<FormWrapper />', () => {
  it('should render an <main> tag', () => {
    const { container } = render(<FormWrapper />);
    expect(container.querySelector('main')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<FormWrapper />);
    expect(container.querySelector('main').hasAttribute('class')).toBe(true);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<FormWrapper attribute="test" />);
    expect(container.querySelector('main[attribute="test"]')).toBeNull();
  });
});
