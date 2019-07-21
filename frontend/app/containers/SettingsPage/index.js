/**
 *
 * SettingsPage
 *
 */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

// Import Selectors
import ContainerWrapper from 'components/App/ContainerWrapper';
import Copyright from 'components/App/Copyright';
import SettingsForm from 'components/App/SettingsForm';
import messages from './messages';

const key = 'settingsPage';

export default function SettingsPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

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
