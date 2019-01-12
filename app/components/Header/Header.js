import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../../images/logo.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    fontSize: 20.5,
    marginTop: -5,
    color: '#0029ab',
    position: 'relative',
    top: 1,
    fontWeight: 500,
  },
  appBar: {
    'box-shadow': 'none', // box-shadow dla header
  },
  toolBar: {
    padding: '0 3%',
    height: 65,
    color: 'black', // color dla header
    backgroundColor: 'white', // background color dla header
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)', // border bottom dla header
  },
  headerSubheading: {
    fontSize: '12.8px',
    marginTop: '-4px',
    color: '#15a0dd',
  },
  imgStyles: {
    width: 40,
    float: 'right',
  },
};

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.grow}>
            Bank Application
            <div className={classes.headerSubheading}>
              Electronic Payment System
            </div>
          </div>
          <div>
            <img
              src={Logo}
              className={classes.imgStyles}
              alt="Bank Application"
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
