/**
 *
 * Navigation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
import SettingsIcon from '@material-ui/icons/Settings';

import { makeIsMobileOpenSelector } from 'components/App/Header/selectors';
import { hiddenMenuMobileAction } from 'components/App/Header/actions';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Import Styles
const styles = () => ({
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
function Navigation({ classes, location, hiddenMobileOpen, isMobileOpen }) {
  return (
    <MenuList className={classes.root} disablePadding>
      <NavLink to="/dashboard">
        <MenuItem
          className={classes.menuItem}
          onClick={isMobileOpen ? hiddenMobileOpen : null}
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
          onClick={isMobileOpen ? hiddenMobileOpen : null}
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
      <NavLink to="/history">
        <MenuItem
          className={classes.menuItem}
          onClick={isMobileOpen ? hiddenMobileOpen : null}
          selected={location.pathname === '/history'}
        >
          <ListItemIcon
            className={classNames(classes.icon, {
              [classes.iconActive]: location.pathname === '/history',
            })}
          >
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText
            classes={
              location.pathname === '/history'
                ? { primary: classes.primaryActive }
                : { primary: classes.primary }
            }
            inset
            primary={<FormattedMessage {...messages.historyItem} />}
          />
        </MenuItem>
      </NavLink>
      {/* <NavLink> */}
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText
          inset
          primary={<FormattedMessage {...messages.creditsItem} />}
        />
      </MenuItem>
      {/* </NavLink> */}
      {/* <NavLink> */}
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <TrendingUpIcon />
        </ListItemIcon>
        <ListItemText
          inset
          primary={<FormattedMessage {...messages.depositsItem} />}
        />
      </MenuItem>
      {/* </NavLink> */}
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <CardIcon />
        </ListItemIcon>
        <ListItemText
          inset
          primary={<FormattedMessage {...messages.cardsItem} />}
        />
      </MenuItem>
      {/* </NavLink> */}
      <NavLink to="/settings">
        <MenuItem
          className={classes.menuItem}
          onClick={isMobileOpen ? hiddenMobileOpen : null}
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

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isMobileOpen: makeIsMobileOpenSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    hiddenMobileOpen: () => dispatch(hiddenMenuMobileAction()),
  };
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Navigation),
  ),
);
