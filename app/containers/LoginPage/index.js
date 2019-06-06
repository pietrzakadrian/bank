/**
 *
 * LoginPage
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Information from 'components/Information';
import Footer from 'components/Footer';
import LoginForm from 'components/LoginForm';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function LoginPage() {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  return (
    <Fragment>
      {/* SEO */}
      <Helmet>
        <FormattedMessage {...messages.helmetLoginTitle}>
          {title => <title>{title}</title>}
        </FormattedMessage>
        <FormattedMessage {...messages.helmetLoginTitle}>
          {description => <meta name="description" content={description} />}
        </FormattedMessage>
      </Helmet>
      {/* SEO */}

      {/* HEADER */}
      <Header />
      <FormattedMessage {...messages.loginToTheSystem}>
        {title => <Subheader title={title} />}
      </FormattedMessage>
      {/* HEADER */}

      {/* CONTENT */}
      <Information />
      <LoginForm />
      {/* CONTENT */}

      {/* FOOTER  */}
      <Footer />
      {/* FOOTER  */}
    </Fragment>
  );
}

LoginPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
