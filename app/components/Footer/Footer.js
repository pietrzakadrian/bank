import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

// Import Material-UI
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';

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
    <footer className={classes.footerComponent}>
      <Divider />
      <Typography className={classes.footerText}>
        <FormattedMessage {...messages.header} />
      </Typography>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
