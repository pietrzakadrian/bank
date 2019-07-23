/**
 *
 * SettingsPage
 *
 */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

// Import Selectors
import ContainerWrapper from 'components/App/ContainerWrapper';
import Copyright from 'components/App/Copyright';
import SettingsForm from 'components/App/SettingsForm';
import messages from './messages';

export default function SettingsPage() {
  return (
    <Fragment>
      <FormattedMessage {...messages.helmetSettingsTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <ContainerWrapper>
        <SettingsForm />
      </ContainerWrapper>

      <Copyright />
    </Fragment>
  );
}
