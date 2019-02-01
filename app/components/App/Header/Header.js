import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ResizeObserver from 'react-resize-observer';
import { withRouter } from 'react-router-dom';

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
import Hidden from '@material-ui/core/Hidden';
import { FormattedMessage } from 'react-intl';
import LoadingLinear from '../../LoadingLinear';

// Import Services
import Logo from '../../../images/logo.png';
import AuthService from '../../../services/AuthService';

// Import Internationalize
import messages from './messages';
import LocaleToggle from '../../../modules/LocaleToggle';

// Import Components
import Sidebar from '../Sidebar';

const Auth = new AuthService();
const drawerWidth = 260;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    paddingRight: '0!important',
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    'box-shadow': '0px 4px 8px -3px rgba(17, 17, 17, .06)', // box-shadow dla header
  },
  toolBar: {
    padding: 0,
    height: 65,
    color: 'black', // color dla header
    backgroundColor: 'white', // background color dla header
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // border bottom dla header
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
  },
  logoutButton: {
    marginLeft: 12,
    paddingLeft: 12,

    '&:hover': {
      cursor: 'pointer',
    },
  },
  imgStyles: {
    width: 40,
    marginLeft: 24,
    marginRight: 24,
  },
  exitToAppClass: {
    color: '#15a0dd',
    fontSize: 28,
    position: 'relative',
    top: -1,
    marginRight: 4,
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();

    this.state = {
      user_id: null,
      mobileOpen: false,
      desktopOpen: true,
    };
  }

  componentWillMount() {
    if (!Auth.loggedIn()) {
      this.props.history.replace('/login');
    } else {
      try {
        const userData = Auth.getUserId();
        this.setState({
          user_id: userData.id,
        });
      } catch (err) {
        Auth.unsetToken();
        this.props.history.replace('/login');
      }
    }
  }

  handleDrawerToggleMobile = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleDrawerToggleDesktop = () => {
    this.setState(state => ({ desktopOpen: !state.desktopOpen }));
  };

  handleLogout() {
    this.Auth.logout(this.state.user_id)
      .then(res => {
        Auth.unsetToken();
        this.props.history.replace('/login');
      })
      .catch(err => {
        Auth.unsetToken();
        this.props.history.replace('/login');
      });
  }

  handleResize() {
    const evt = window.document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt);
  }

  render() {
    const { classes, theme, location } = this.props;
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
            [classes.appBarShift]: this.state.desktopOpen,
          })}
        >
          <Toolbar className={classes.toolBar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggleMobile}
              className={classes.menuButtonMobile}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggleDesktop}
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
            {/* <div className={classes.localeToggle}>
              <LocaleToggle />
            </div> */}
            <button type="button" className={classes.logoutButton}>
              <MailOutlineIcon className={classes.exitToAppClass} />
              Wiadomości
            </button>

            <button type="button" className={classes.logoutButton}>
              <NotificationsNoneIcon className={classes.exitToAppClass} />
              Powiadomienia
            </button>

            <button
              type="button"
              onClick={this.handleLogout.bind(this)}
              className={classes.logoutButton}
            >
              <ExitToAppIcon className={classes.exitToAppClass} />
              Wyloguj
            </button>
            <div>
              <img
                src={Logo}
                className={classes.imgStyles}
                alt="Bank Application"
              />
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Sidebar
              open={this.state.mobileOpen}
              onMenuItemClicked={() => this.setState({ mobileOpen: false })}
              variant="temporary"
              onClose={this.handleDrawerToggleMobile}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Sidebar
              open={this.state.desktopOpen}
              onMenuItemClicked={() => this.setState({ mobileOpen: false })}
              variant="persistent"
              onClose={this.handleDrawerToggleDesktop}
            />
          </Hidden>
        </nav>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: this.state.desktopOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          {this.props.children}​
          <ResizeObserver
            onResize={rect => {
              const evt = window.document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, window, 0);
              window.dispatchEvent(evt);
            }}
          />
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
