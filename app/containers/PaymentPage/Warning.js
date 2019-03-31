/**
 *
 * warning
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Material UI
import { withStyles } from '@material-ui/core/styles';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';
// Import Styles
const styles = {
  warningContainer: {
    maxWidth: 550,
    margin: '45px auto',
  },
  warningText: {
    textAlign: 'left',
    padding: '0 15px',
    margin: '10px -4px',
  },
  warningLink: {
    color: '#0098db',
    padding: 0,
    cursor: 'pointer',
  },
  errorIcon: {
    fontSize: 35,
  },
  warningInfoText: {
    position: 'relative',
    top: 1,
    fontSize: 13,
  },
  warningAlertText: {
    color: 'red',
    fontSize: 13,
  },
};

function Warning({ classes }) {
  return (
    <Fragment>
      <div className={classes.warningContainer}>
        <div className={classes.warningText}>
          <ErrorOutline className={classes.errorIcon} />{' '}
          <span className={classes.warningInfoText}>
            <FormattedMessage {...messages.warningInfo1} />
          </span>
        </div>

        <div className={classes.warningText}>
          <span className={classes.warningInfoText}>
            <FormattedMessage {...messages.warningInfo2} />
            <ul>
              <li>
                <FormattedMessage {...messages.warningLiElement1} />
              </li>
              <li>
                <FormattedMessage {...messages.warningLiElement2} />
              </li>
            </ul>
          </span>
        </div>

        <div className={classes.warningText}>
          <span className={classes.warningAlertText}>
            <FormattedMessage {...messages.warningAlertText1} />
          </span>
        </div>
      </div>
    </Fragment>
  );
}

Warning.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Warning);
