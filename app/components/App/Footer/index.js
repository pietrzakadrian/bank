import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Import Material-UI
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 260;
const styles = {
  footerComponent: {
    position: 'fixed',
    bottom: 0,
    width: drawerWidth,
  },
  footerText: {
    margin: '10px',
    textAlign: 'center',
  },
};

export function Footer({ classes }) {
  return (
    <footer
      className={classNames(classes.footerComponent, 'footer--container')}
    >
      <Divider />
      <Typography className={classes.footerText}>
        Bank Application 1.0 | 30.04.2019
      </Typography>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
