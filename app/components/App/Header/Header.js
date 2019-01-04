import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Import Services
import { FormattedMessage } from 'react-intl';
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
    color: '#0029ab',
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
  logoutButton: {
    marginLeft: 12,
    paddingLeft: 12,

    '&:hover': {
      cursor: 'pointer',
    },
  },
  imgStyles: {
    width: 45,
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
      open: true,
    };
  }

  // componentWillMount() {
  //   if (!Auth.loggedIn()) {
  //     this.props.history.replace('/login');
  //   } else {
  //     try {
  //       const userData = Auth.getUserdata();
  //       this.setState({
  //         user_id: userData.id,
  //       });
  //     } catch (err) {
  //       Auth.logout();
  //       this.props.history.replace('/login');
  //     }
  //   }
  // }

  handleDrawerToggle = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  handleLogout() {
    // this.Auth.updateLastLoggedDate(this.state.user_id, this.state.data)
    //   .then(res => {
    //     if (res) {

    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    Auth.logout();
    this.props.history.replace('/login');
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
            {/* <div className={classes.localeToggle}>
              <LocaleToggle />
            </div> */}
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
