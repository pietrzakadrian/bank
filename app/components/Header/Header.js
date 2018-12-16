import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import LocaleToggle from '../../modules/LocaleToggle';

// Import Components
import Sidebar from '../Sidebar';

const drawerWidth = 260;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    'box-shadow': 'none', // box-shadow dla header
  },
  toolBar: {
    padding: 0,
    height: 65,
    color: 'black', // color dla header
    backgroundColor: 'white', // background color dla header
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // border bottom dla header
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 12,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  headerItemTitle: {
    flexGrow: 1,
  },
  localeToggle: {
    marginLeft: 12,
    marginRight: 12,
    padding: 12,
  },
});

class Header extends Component {
  state = {
    open: true,
  };

  handleDrawerToggle = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem('userToken');
    this.props.history.push(`/`);
  }

  render() {
    const { classes, theme, location } = this.props;
    const { open } = this.state;
    const headerTitle = {
      '/dashboard': <FormattedMessage {...messages.dashboardTitle} />,
      '/payment': <FormattedMessage {...messages.paymentTitle} />,
      '/settings': <FormattedMessage {...messages.settingsTitle} />,
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className={classes.toolBar} disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classNames(classes.menuButton, open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.headerItemTitle}
              variant="h6"
              color="inherit"
              noWrap
            >
              {headerTitle[location.pathname]}
            </Typography>
            <div className={classes.localeToggle}>
              <LocaleToggle />
              <button type="button" onClick={this.logOut.bind(this)}>
                Logout
              </button>
            </div>
          </Toolbar>
        </AppBar>
        <Sidebar open={open} />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withRouter(Header));
