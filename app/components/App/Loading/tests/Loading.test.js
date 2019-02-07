import React from 'react';
import { shallow } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loading from '../Loading';

describe('<Navigation />', () => {
  it('renders without crashing', () => {
    shallow(<Loading />);
  });

  it('includes Drawer', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.shallow(<CircularProgress />));
  });
});
