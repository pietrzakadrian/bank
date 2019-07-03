/**
 *
 * LoginPage
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Information from 'components/Information';
import Footer from 'components/Footer';
import LoginForm from 'components/LoginForm';
import { isLoggedAction } from './actions';
import messages from './messages';

import reducer from './reducer';
import saga from './saga';

export function LoginPage({ isLogged }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  useEffect(() => {
    isLogged();
  }, []);

  return (
    <Fragment>
      <FormattedMessage {...messages.helmetLoginTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <Header />
      <FormattedMessage {...messages.loginToTheSystem}>
        {title => <Subheader title={title} />}
      </FormattedMessage>

      <Information />
      <LoginForm />

      <Footer />
    </Fragment>
  );
}

LoginPage.propTypes = {
  isLogged: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    isLogged: () => dispatch(isLoggedAction()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
