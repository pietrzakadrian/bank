import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../Navigation';

describe('<Navigation />', () => {
  it('renders without crashing', () => {
    shallow(<Navigation />);
  });

  it('pass props without crashing', () => {
    const navigation = shallow(<Navigation />);
    expect(navigation.props().classes);
    expect(navigation.props().location);
  });
});
