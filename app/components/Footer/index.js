/**
 *
 * Footer
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

// Import Material UI
import { withStyles } from '@material-ui/core/styles';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

// Import Internationalize
import { FormattedMessage } from 'react-intl';
import messages from './messages';
// Import Styles
const styles = {
  footerContainer: {
    maxWidth: 550,
    margin: '15px auto',
  },
  footerText: {
    textAlign: 'left',
    padding: '0 15px',
    margin: '10px -4px',
  },
  footerLink: {
    color: '#0098db',
    padding: 0,
    cursor: 'pointer',
  },
  privacyLink: {
    color: 'black',
    padding: 0,
    cursor: 'pointer',
  },
  errorIcon: {
    fontSize: 35,
  },
  footerInfoText: {
    position: 'relative',
    top: 1,
    fontSize: 13,
  },
  footerAlertText: {
    color: 'red',
    fontSize: 13,
  },
};

function Footer({ classes, location }) {
  return (
    <Fragment>
      <div className={classes.footerContainer}>
        <div className={classes.footerText}>
          {location.pathname === '/login' ? (
            <b>
              <FormattedMessage {...messages.boldMainText} />{' '}
              <NavLink to="/register">
                <button type="button" className={classes.footerLink}>
                  <FormattedMessage {...messages.registerButton} />
                </button>
              </NavLink>
            </b>
          ) : (
            <b>
              <FormattedMessage {...messages.boldMainTextLogin} />{' '}
              <NavLink to="/login">
                <button type="button" className={classes.footerLink}>
                  <FormattedMessage {...messages.loginButton} />
                </button>
              </NavLink>
            </b>
          )}
        </div>
      </div>
      <div className={classes.footerContainer}>
        <div className={classes.footerText}>
          <ErrorOutline className={classes.errorIcon} />{' '}
          <span className={classes.footerInfoText}>
            <FormattedMessage {...messages.footerInfo1} />
          </span>
        </div>

        <div className={classes.footerText}>
          <span className={classes.footerInfoText}>
            <FormattedMessage {...messages.footerInfo2} />
            <ul>
              <li>
                <FormattedMessage {...messages.footerLiElement1} />
              </li>
              <li>
                <FormattedMessage {...messages.footerLiElement2} />
              </li>
            </ul>
          </span>
        </div>

        <div className={classes.footerText}>
          <span className={classes.footerAlertText}>
            <FormattedMessage {...messages.footerAlertText1} />
          </span>
        </div>

        <div className={classes.footerText}>
          <span className={classes.footerInfoText}>
            <FormattedMessage {...messages.footerAlertText2} />{' '}
            <NavLink to="/privacy">
              <button type="button" className={classes.privacyLink}>
                <FormattedMessage {...messages.privacyRules} />
              </button>
            </NavLink>
          </span>
        </div>
      </div>
    </Fragment>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Footer));
