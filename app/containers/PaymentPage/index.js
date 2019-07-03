/**
 *
 * PaymentPage
 *
 */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Copyright from 'components/App/Copyright';
import ContainerWrapper from 'components/App/ContainerWrapper';
import { Helmet } from 'react-helmet';
import Footer from 'components/Footer';
import PaymentForm from 'components/App/PaymentForm';
import Notifier from 'components/Notifier';
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

      <ContainerWrapper>
        <PaymentForm />
      </ContainerWrapper>
      <Footer />
      <Copyright />
      <Notifier />
    </Fragment>
  );
}

export default PaymentPage;
