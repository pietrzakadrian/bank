/**
 *
 * Footer
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from 'containers/App/selectors';
import { compose } from 'redux';

// Import Components
import ErrorOutlineIcon from './ErrorOutlineIcon';
import FooterWrapper from './FooterWrapper';
import FooterTitleWrapper from './FooterTitleWrapper';
import FooterTextWrapper from './FooterTextWrapper';
import FooterAlertWrapper from './FooterAlertWrapper';
import ButtonWrapper from './ButtonWrapper';
import PrivacyWrapper from './PrivacyWrapper';

import messages from './messages';

function Footer({ location }) {
  return (
    <FooterWrapper>
      <FooterTitleWrapper>
        {location.pathname === '/login' ? (
          <Fragment>
            <FormattedMessage {...messages.boldMainText} />
            <NavLink to="/register">
              <ButtonWrapper type="button">
                <FormattedMessage {...messages.registerButton} />
              </ButtonWrapper>
            </NavLink>
          </Fragment>
        ) : (
          <Fragment>
            <FormattedMessage {...messages.boldMainTextLogin} />
            <NavLink to="/login">
              <ButtonWrapper type="button">
                <FormattedMessage {...messages.loginButton} />
              </ButtonWrapper>
            </NavLink>
          </Fragment>
        )}
      </FooterTitleWrapper>

      <FooterTextWrapper>
        <ErrorOutlineIcon />
        <FormattedMessage {...messages.footerInfo1} />
      </FooterTextWrapper>

      <FooterTextWrapper>
        <FormattedMessage {...messages.footerInfo2} />
        <ul>
          <li>
            <FormattedMessage {...messages.footerLiElement1} />
          </li>
          <li>
            <FormattedMessage {...messages.footerLiElement2} />
          </li>
        </ul>
      </FooterTextWrapper>

      <FooterAlertWrapper>
        <FormattedMessage {...messages.footerAlertText1} />
      </FooterAlertWrapper>

      <FooterTextWrapper>
        <Fragment>
          <FormattedMessage {...messages.footerAlertText2} />
          <NavLink to="/privacy">
            <PrivacyWrapper type="button">
              <FormattedMessage {...messages.privacyRules} />
            </PrivacyWrapper>
          </NavLink>
        </Fragment>
      </FooterTextWrapper>
    </FooterWrapper>
  );
}

Footer.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(withRouter(Footer));
