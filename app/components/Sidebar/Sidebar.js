import React from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

// Import Components
import Navigation from '../Navigation';
import Footer from '../Footer';

const drawerWidth = 260;
const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'center',
    fontSize: 18,
  },
});

function Sidebar({ open, classes }) {
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>Bank Application v0.2</div>
      <Divider />
      <Navigation />
      <Footer />
    </Drawer>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
