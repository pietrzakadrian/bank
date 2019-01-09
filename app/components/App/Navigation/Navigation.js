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
import HistoryIcon from '@material-ui/icons/History';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider/Divider';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Import Styles
const styles = theme => ({
  primaryActive: {
    color: 'white',
  },
  icon: {
    paddingLeft: 15,
    marginRight: 18,
    color: '#15a0dd',
  },
  iconActive: {
    color: 'white',
  },
  selected: {},
});

class Navigation extends Component {
  state = {};

  render() {
    const { classes, location, open } = this.props;

    return (
      <MenuList className={classes.root} disablePadding>
        <NavLink to="/dashboard">
          <MenuItem
            className={classes.menuItem}
            onClick={() => this.props.onMenuItemClicked()}
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
              classes={
                location.pathname === '/dashboard'
                  ? { primary: classes.primaryActive }
                  : { primary: classes.primary }
              }
              inset
              primary={<FormattedMessage {...messages.dashboardItem} />}
            />
          </MenuItem>
        </NavLink>
        <NavLink to="/payment">
          <MenuItem
            className={classes.menuItem}
            onClick={() => this.props.onMenuItemClicked()}
            selected={location.pathname === '/payment'}
          >
            <ListItemIcon
              className={classNames(classes.icon, {
                [classes.iconActive]: location.pathname === '/payment',
              })}
            >
              <SwapVertIcon />
            </ListItemIcon>
            <ListItemText
              classes={
                location.pathname === '/payment'
                  ? { primary: classes.primaryActive }
                  : { primary: classes.primary }
              }
              inset
              primary={<FormattedMessage {...messages.paymentItem} />}
            />
          </MenuItem>
        </NavLink>
        {/* <NavLink> */}
        <MenuItem disabled className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText inset primary="Rachunki" />
        </MenuItem>
        {/* </NavLink> */}
        {/* <NavLink> */}
        <MenuItem disabled className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary={<FormattedMessage {...messages.historyItem} />}
          />
        </MenuItem>
        {/* </NavLink> */}
        {/* <NavLink> */}
        <MenuItem disabled className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText inset primary="Kredyty" />
        </MenuItem>
        {/* </NavLink> */}
        {/* <NavLink> */}
        <MenuItem disabled className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText inset primary="Lokaty" />
        </MenuItem>
        {/* </NavLink> */}
        <MenuItem disabled className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <CardIcon />
          </ListItemIcon>
          <ListItemText inset primary="Karty" />
        </MenuItem>
        {/* </NavLink> */}
        <NavLink to="/settings">
          <MenuItem
            className={classes.menuItem}
            onClick={() => this.props.onMenuItemClicked()}
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
              classes={
                location.pathname === '/settings'
                  ? { primary: classes.primaryActive }
                  : { primary: classes.primary }
              }
              inset
              primary={<FormattedMessage {...messages.settingsItem} />}
            />
          </MenuItem>
        </NavLink>
      </MenuList>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Navigation));
