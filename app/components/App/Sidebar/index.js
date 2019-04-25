/**
 *
 * Sidebar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

// Import Components
import Navigation from 'components/App/Navigation';
import Footer from 'components/App/Footer';

const drawerWidth = 260;
const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: '4px 0px 8px -3px rgba(17, 17, 17, .06)',
    overflowX: 'hidden',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    minHeight: 64,
  },
  headerText: {
    fontSize: 20.5,
    marginTop: -5,
    color: '#0029ab',
    position: 'relative',
    top: 1,
    fontWeight: 700,
  },
  headerSubheading: {
    fontSize: '12.8px',
    color: '#15a0dd',
    marginTop: -5,
    textAlign: 'center',
  },
});

function Sidebar({ open, classes, variant, onClose }) {
  return (
    <Drawer
      className={classes.drawer}
      variant={variant}
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={onClose}
    >
      <div className={classes.drawerHeader}>
        <div className={classes.headerText}>
          Bank Application
          <div className={classes.headerSubheading}>
            Electronic Payment System
          </div>
        </div>
      </div>
      <Divider />
      <Navigation open={open} />
      <Footer />
    </Drawer>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(Sidebar);
