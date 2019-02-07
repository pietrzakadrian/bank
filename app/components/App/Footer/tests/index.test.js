import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer';

it('export without crashing', () => {
  shallow(<Footer />);
});
