import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('<Header />', () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });

  it('includes Drawer', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.shallow(<div />));
  });
});
