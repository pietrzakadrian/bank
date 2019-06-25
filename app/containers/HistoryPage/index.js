/**
 *
 * HistoryPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

// Import Components
import ContainerWrapper from 'components/App/ContainerWrapper';
import HistoryGrid from 'components/App/HistoryGrid';
import Copyright from 'components/App/Copyright';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function HistoryPage() {
  useInjectReducer({ key: 'historyPage', reducer });
  useInjectSaga({ key: 'historyPage', saga });

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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(HistoryPage);
