import React from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

// Import Components
import Navigation from '../Navigation';
import Footer from '../Footer';

const drawerWidth = 261;
const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    // boxShadow: '4px 0px 8px -3px rgba(17, 17, 17, .06)',
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
    fontWeight: 500,
  },
  headerSubheading: {
    fontSize: '12.8px',
    marginTop: '-4px',
    color: '#15a0dd',
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
      {/* // TODO: Sidebar off mobile when select navigation item */}
      <Navigation />
      <Footer />
    </Drawer>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
