/**
 *
 * NotFoundPage
 *
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Information from 'components/Information';
import Footer from 'components/Footer';
import FormWrapper from 'components/FormWrapper';
import TextWrapper from './TextWrapper';
import messages from './messages';

export default function NotFoundPage() {
  return (
    <Fragment>
      <FormattedMessage {...messages.helmetNotFoundPageTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <Header />
      <FormattedMessage {...messages.notFoundPage}>
        {title => <Subheader title={title} />}
      </FormattedMessage>

      <Information />
      <FormWrapper>
        <TextWrapper large>
          <FormattedMessage {...messages.sorryThisPageIsUnavailable} />
        </TextWrapper>

        <TextWrapper>
          <FormattedMessage {...messages.sorrySubheader} />
        </TextWrapper>
      </FormWrapper>

      <Footer />
    </Fragment>
  );
}
