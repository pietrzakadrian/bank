import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('<Header />', () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });

  it('pass props without crashing', () => {
    const header = shallow(<Header />);
    expect(header.props().classes);
  });

  it('includes div', () => {
    const header = shallow(<Header />);
    expect(header.shallow(<div />));
  });
});
