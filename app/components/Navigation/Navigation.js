import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

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
const styles = {
  menuItem: {},
  primary: {},
  icon: {
    paddingLeft: 10,
  },
};

function Navigation({ classes }) {
  return (
    <Fragment>
      <MenuList>
        <NavLink to="/dashboard">
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary={<FormattedMessage {...messages.dashboardItem} />}
            />
          </MenuItem>
        </NavLink>
        <NavLink to="/payment">
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <CardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary={<FormattedMessage {...messages.paymentItem} />}
            />
          </MenuItem>
        </NavLink>
      </MenuList>
      <Divider />

      <MenuList>
        <NavLink to="/settings">
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
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

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
