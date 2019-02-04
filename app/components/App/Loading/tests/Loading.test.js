import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';

it('renders without crashing', () => {
  shallow(<Loading />);
});
