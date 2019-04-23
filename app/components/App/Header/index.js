/**
 *
 * HeaderApp
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Helmet from 'react-helmet';
import ResizeObserver from 'react-resize-observer';
import socketIOClient from 'socket.io-client';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Hidden from '@material-ui/core/Hidden';
import Badge from '@material-ui/core/Badge';

// Import Services
import AuthService from 'services/AuthService';

// Import Components
import Sidebar from 'components/App/Sidebar';
import Logo from 'images/logo.png';
import Notification from 'components/App/Notification';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { successLoginAction } from 'containers/LoginPage/actions';
import {
  makeIsNewNotificationSelector,
  makeIsLoggedSelector,
  makeUserIdSelector,
  makeNotificationCountSelector,
} from 'containers/App/selectors';
import {
  makeIsMobileOpenSelector,
  makeIsDesktopOpenSelector,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  logoutAction,
  toggleMenuDesktopAction,
  toggleMenuMobileAction,
  isNotificationAction,
  unsetNotificationAction,
  hiddenMenuMobileAction,
} from './actions';

const drawerWidth = 260;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: 'white!important',
    paddingRight: '0!important',
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    'box-shadow': '0px 4px 8px -3px rgba(17, 17, 17, .06)', // box-shadow dla header
  },
  badge: {
    left: -15,
    right: 'auto',
    backgroundColor: '#ea0000',
    color: 'white',
  },
  toolBar: {
    padding: 0,
    height: 65,
    color: 'black', // color dla header
    backgroundColor: 'white!important', // background color dla header
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // border bottom dla header

    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },
  appBarShift: {
    paddingRight: '0!important',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonMobile: {
    marginLeft: 12,
    marginRight: 12,
    color: '#0029ab',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuButtonDesktop: {
    marginLeft: 12,
    marginRight: 12,
    color: '#0029ab',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
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
    [theme.breakpoints.up('md')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
      position: 'relative',
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    position: 'relative',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    position: 'relative',
  },
  headerItemTitle: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  logoutButton: {
    margin: '0 6px',
    padding: '0 6px',

    '&:hover': {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 1.5vh',
      margin: 0,
    },
  },
  imgStyles: {
    width: 40,
    marginLeft: 12,
    marginRight: 24,
  },
  exitToAppClass: {
    color: '#15a0dd',
    fontSize: 28,
    position: 'relative',
    top: -1,
    marginRight: 4,
  },
  headerMenuItem: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  imgContainer: {
    [theme.breakpoints.down('xs')]: {
      // right: 0,
    },
  },
  headerTopItems: {
    [theme.breakpoints.down('xs')]: {
      margin: '0 auto',
    },
    display: 'inherit',
    fontSize: 15,
  },
});

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();
  }

  componentDidMount() {
    if (!this.Auth.loggedIn()) this.props.history.replace('/login');
    else if (!this.props.isLogged) this.props.onLogin(this.Auth.getToken());

    this.props.isNotification();
  }

  componentDidUpdate() {
    if (!this.Auth.loggedIn()) this.props.history.replace('/login');
  }

  render() {
    const {
      classes,
      location,
      toggleMobileMenu,
      toggleDesktopMenu,
      onLogout,
      unsetNotification,
      isNewNotification,
      notificationCount,
    } = this.props;
    const headerTitle = {
      '/dashboard': <FormattedMessage {...messages.dashboardTitle} />,
      '/payment': <FormattedMessage {...messages.paymentTitle} />,
      '/history': <FormattedMessage {...messages.historyTitle} />,
      '/settings': <FormattedMessage {...messages.settingsTitle} />,
    };
    const socket = socketIOClient('/');

    socket.on('connect', () => {
      socket.emit('authenticate', { token: this.Auth.getToken() }); // send the jwt
    });

    socket.on('new notification', id => {
      id === this.props.userId ? this.props.isNotification() : null;
    });

    return (
      <Fragment>
        {isNewNotification ? (
          <Helmet
            titleTemplate={`(${
              this.props.notificationCount > 9
                ? '9+'
                : this.props.notificationCount
            }) %s`}
          />
        ) : null}
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.props.isDesktopOpen,
            })}
          >
            <Toolbar className={classes.toolBar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={toggleMobileMenu}
                className={classes.menuButtonMobile}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={toggleDesktopMenu}
                className={classes.menuButtonDesktop}
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

              <button type="button" className={classes.logoutButton}>
                <MailOutlineIcon className={classes.exitToAppClass} />
                <span className={classes.headerMenuItem}>
                  <FormattedMessage {...messages.headerItemMessagesTitle} />
                </span>
              </button>

              <button
                type="button"
                className={classes.logoutButton}
                onClick={isNewNotification ? unsetNotification : null}
              >
                {isNewNotification ? (
                  <Badge
                    badgeContent={
                      notificationCount > 9 ? '9+' : notificationCount
                    }
                    invisible={!isNewNotification}
                    classes={{ badge: classes.badge }}
                  >
                    <NotificationsActiveIcon
                      className={classes.exitToAppClass}
                    />
                  </Badge>
                ) : (
                  <Badge
                    badgeContent={1}
                    invisible={!isNewNotification}
                    classes={{ badge: classes.badge }}
                  >
                    <NotificationsNoneIcon className={classes.exitToAppClass} />
                  </Badge>
                )}
                <span className={classes.headerMenuItem}>
                  <FormattedMessage
                    {...messages.headerItemNotificationsTitle}
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={() => onLogout()}
                className={classes.logoutButton}
              >
                <ExitToAppIcon className={classes.exitToAppClass} />
                <span className={classes.headerMenuItem}>
                  <FormattedMessage {...messages.headerItemLogoutTitle} />
                </span>
              </button>

              <div className={classes.imgContainer}>
                <img
                  src={Logo}
                  className={classes.imgStyles}
                  alt="Bank Application"
                />
              </div>

              <Notification />
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            <Hidden mdUp implementation="css">
              <Sidebar
                open={this.props.isMobileOpen}
                variant="temporary"
                onClose={toggleMobileMenu}
              />
            </Hidden>
            <Hidden smDown implementation="css">
              <Sidebar
                open={this.props.isDesktopOpen}
                variant="persistent"
                onClose={toggleDesktopMenu}
              />
            </Hidden>
          </nav>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: this.props.isDesktopOpen,
            })}
          >
            <div className={classes.drawerHeader} />
            {this.props.children}
            <ResizeObserver
              onResize={() => {
                const evt = window.document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
              }}
            />
          </main>
        </div>
      </Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isMobileOpen: makeIsMobileOpenSelector(),
  isDesktopOpen: makeIsDesktopOpenSelector(),
  isNewNotification: makeIsNewNotificationSelector(),
  notificationCount: makeNotificationCountSelector(),
  isLogged: makeIsLoggedSelector(),
  userId: makeUserIdSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogin: token => dispatch(successLoginAction(token)),
    onLogout: id => dispatch(logoutAction(id)),
    toggleDesktopMenu: () => dispatch(toggleMenuDesktopAction()),
    toggleMobileMenu: () => dispatch(toggleMenuMobileAction()),
    hiddenMobileOpen: () => dispatch(hiddenMenuMobileAction()),
    isNotification: () => dispatch(isNotificationAction()),
    unsetNotification: () => dispatch(unsetNotificationAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(Header);
