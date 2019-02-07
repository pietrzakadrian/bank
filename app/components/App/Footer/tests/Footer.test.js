import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import Divider from '@material-ui/core/Divider';
import Footer from '../Footer';
import messages from '../messages';

it('renders without crashing', () => {
  shallow(<Footer />);
});

it('includes footer', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.shallow(<footer />));
});

it('includes Divider', () => {
  const wrapper = shallow(<footer />);
  expect(wrapper.shallow(<Divider />));
});

it('includes Typography', () => {
  const wrapper = shallow(<footer />);
  expect(wrapper.shallow(<Typography />));
});

it('includes FormattedMessage', () => {
  const wrapper = shallow(<Typography />);
  expect(wrapper.shallow(<FormattedMessage {...messages.footer} />));
});
