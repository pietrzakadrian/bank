/**
 *
 * HistoryPage
 *
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

// Import Components
import ContainerWrapper from 'components/App/ContainerWrapper';
import HistoryGrid from 'components/App/HistoryGrid';
import Copyright from 'components/App/Copyright';
import messages from './messages';

const key = 'historyPage';

export default function HistoryPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Fragment>
      <FormattedMessage {...messages.helmetHistoryTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <ContainerWrapper>
        <HistoryGrid />
      </ContainerWrapper>
      <Copyright />
    </Fragment>
  );
}
