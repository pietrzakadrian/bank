/**
 *
 * HistoryPage
 *
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Components
import ContainerWrapper from 'components/App/ContainerWrapper';
import HistoryGrid from 'components/App/HistoryGrid';
import messages from './messages';

export default function HistoryPage() {
  return (
    <Fragment>
      <FormattedMessage {...messages.helmetHistoryTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <ContainerWrapper>
        <HistoryGrid />
      </ContainerWrapper>
    </Fragment>
  );
}
