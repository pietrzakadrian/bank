import React from 'react';
import { shallow } from 'enzyme';
import ResizeObserver from 'react-resize-observer';
import Header from '../Header';

describe('<Header />', () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });

  it('includes div', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.shallow(<div />));
  });

  it('includes resizeObserver', () => {
    const resizeObserver = shallow(<ResizeObserver />);
    resizeObserver.simulate('resize');
  });
});
