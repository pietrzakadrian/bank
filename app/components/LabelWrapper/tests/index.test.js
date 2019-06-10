/**
 *
 * Tests for LabelWrapper
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import LabelWrapper from '../index';

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
