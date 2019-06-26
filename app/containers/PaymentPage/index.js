/**
 *
 * PaymentPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Copyright from 'components/App/Copyright';
import ContainerWrapper from 'components/App/ContainerWrapper';
import { Helmet } from 'react-helmet';
import Footer from 'components/Footer';
import makeSelectPaymentPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function PaymentPage() {
  useInjectReducer({ key: 'paymentPage', reducer });
  useInjectSaga({ key: 'paymentPage', saga });

  return (
    <Fragment>
      <FormattedMessage {...messages.helmetPaymentTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <ContainerWrapper>test</ContainerWrapper>
      <Footer />
      <Copyright />
    </Fragment>
  );
}

PaymentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  paymentPage: makeSelectPaymentPage(),
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

export default compose(withConnect)(PaymentPage);
