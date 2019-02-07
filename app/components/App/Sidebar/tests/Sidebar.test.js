import React from 'react';
import { shallow } from 'enzyme';
import Drawer from '@material-ui/core/Drawer';
import Navigation from '../../Navigation';
import Sidebar from '../Sidebar';

describe('<Sidebar />', () => {
  const open = true;
  const variant = 'success';

  function onClose() {
    this.setState(state => ({ desktopOpen: !state.desktopOpen }));
  }

  function onMenuItemClicked() {
    this.setState({ mobileOpen: false });
  }

  it('renders without crashing', () => {
    shallow(
      <Sidebar
        open={open}
        variant={variant}
        onClose={onClose}
        onMenuItemClicked={onMenuItemClicked}
      />,
    );
  });

  it('includes Drawer', () => {
    const wrapper = shallow(
      <Sidebar
        open={open}
        variant={variant}
        onClose={onClose}
        onMenuItemClicked={onMenuItemClicked}
      />,
    );
    expect(wrapper.shallow(<Drawer />));
  });

  it('includes Navigation', () => {
    const wrapper = shallow(<Drawer />);
    expect(wrapper.shallow(<Navigation />));
  });
});
