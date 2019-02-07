import React from 'react';
import { shallow } from 'enzyme';
import AccountBills from '../AccountBills';

describe('<AccountBills />', () => {
  it('renders without crashing', () => {
    shallow(<AccountBills />);
  });
});
