/**
 *
 * PrivacyPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Information from 'components/Information';
import Footer from 'components/Footer';
import FormWrapper from 'components/FormWrapper';
import TextWrapper from './TextWrapper';

import messages from './messages';

export function PrivacyPage() {
  return (
    <Fragment>
      <FormattedMessage {...messages.helmetPrivacyTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <Header />
      <FormattedMessage {...messages.privacy}>
        {title => <Subheader title={title} />}
      </FormattedMessage>

      <Information />
      <FormWrapper>
        <TextWrapper>
          <FormattedMessage {...messages.rodo1} />
        </TextWrapper>

        <TextWrapper>
          <FormattedMessage {...messages.rodo2} />
        </TextWrapper>

        <TextWrapper>
          <FormattedMessage {...messages.rodo3} />
        </TextWrapper>

        <TextWrapper>
          <FormattedMessage {...messages.rodo4} />
        </TextWrapper>
      </FormWrapper>

      <Footer />
    </Fragment>
  );
}

PrivacyPage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(PrivacyPage);
