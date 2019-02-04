import React from 'react';
import { shallow } from 'enzyme';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Footer from '../Footer';

it('includes Divider', () => {
  const app = shallow(<Footer />);
  expect(app.containsMatchingElement(<Divider />)).toEqual(true);
});

it('includes Typography', () => {
  const app = shallow(<Footer />);
  expect(app.containsMatchingElement(<Typography />)).toEqual(true);
});
