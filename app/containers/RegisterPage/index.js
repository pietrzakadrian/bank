/**
 *
 * RegisterPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function RegisterPage() {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });
  // useEffect(() => {
  //   isLogged();
  // }, []);

  return (
    <Fragment>
      <Helmet>
        <FormattedMessage {...messages.helmetLoginTitle}>
          {title => <title>{title}</title>}
        </FormattedMessage>
        {/* <FormattedMessage {...messages.helmetRegisterTitle}>
          {description => <meta name="description" content={description} />}
        </FormattedMessage> */}
      </Helmet>

      <Header />
      <FormattedMessage {...messages.registerText}>
        {title => <Subheader title={title} />}
      </FormattedMessage>

      <Information />
      <Footer />
    </Fragment>
  );
}

RegisterPage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterPage);
