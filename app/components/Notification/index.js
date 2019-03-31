import React from 'react';
import PropTypes from 'prop-types';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = theme => ({
  alertContainer: {
    maxWidth: '1024px',
    padding: '10px 3%',
    margin: '10px auto 0',
    borderRadius: 2,
    backgroundColor: '#0098db',
    color: 'white',
  },
  messageContainer: {
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 130px',
    },
  },
});

function Notification({ classes }) {
  return (
    <div className={classes.alertContainer}>
      <div className={classes.messageContainer}>
        <FormattedMessage {...messages.NotificationHeader} />
      </div>
    </div>
  );
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notification);
