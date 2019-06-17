/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import GreetingHeader from 'components/App/GreetingHeader';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function DashboardPage() {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });

  return (
    <div>
      <Helmet>
        <title>DashboardPage</title>
        <meta name="description" content="Description of DashboardPage" />
      </Helmet>
      <GreetingHeader />
    </div>
  );
}

DashboardPage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardPage);
