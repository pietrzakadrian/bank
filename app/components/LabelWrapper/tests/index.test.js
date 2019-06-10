/**
 *
 * Tests for LabelWrapper
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import LabelWrapper from '../index';

describe('<LabelWrapper />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<LabelWrapper />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<LabelWrapper />);
    expect(firstChild).toMatchSnapshot();
  });

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
