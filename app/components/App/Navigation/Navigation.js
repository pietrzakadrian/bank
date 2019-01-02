import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import classNames from 'classnames';

// Import Material-UI
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CardIcon from '@material-ui/icons/CreditCard';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider/Divider';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Import Styles
const styles = theme => ({
  root: {},
  menuItem: {},
  primary: {},
  primaryActive: {
    fontWeight: 700,
  },
  icon: {
    paddingLeft: 10,
  },
  iconActive: {
    color: '#0029ab',
  },
  selected: {},
});

class Navigation extends Component {
  state = {};

  render() {
    const { classes, location } = this.props;

    return (
      <Fragment>
        <MenuList className={classes.root}>
          <NavLink to="/dashboard">
            <MenuItem
              className={classes.menuItem}
              selected={location.pathname === '/dashboard'}
            >
              <ListItemIcon
                className={classNames(classes.icon, {
                  [classes.iconActive]: location.pathname === '/dashboard',
                })}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary={<FormattedMessage {...messages.dashboardItem} />}
              />
            </MenuItem>
          </NavLink>
          <NavLink to="/payment">
            <MenuItem
              className={classes.menuItem}
              selected={location.pathname === '/payment'}
            >
              <ListItemIcon
                className={classNames(classes.icon, {
                  [classes.iconActive]: location.pathname === '/payment',
                })}
              >
                <CardIcon />
              </ListItemIcon>
              <ListItemText
                inset
                primary={<FormattedMessage {...messages.paymentItem} />}
              />
            </MenuItem>
          </NavLink>
          {/* <NavLink> */}
          <MenuItem disabled className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <CardIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary={<FormattedMessage {...messages.historyItem} />}
            />
          </MenuItem>
          {/* </NavLink> */}
        </MenuList>
        <Divider />

        <MenuList>
          <NavLink to="/settings">
            <MenuItem
              className={classes.menuItem}
              selected={location.pathname === '/settings'}
            >
              <ListItemIcon
                className={classNames(classes.icon, {
                  [classes.iconActive]: location.pathname === '/settings',
                })}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary={<FormattedMessage {...messages.settingsItem} />}
              />
            </MenuItem>
          </NavLink>
        </MenuList>
      </Fragment>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navigation));
