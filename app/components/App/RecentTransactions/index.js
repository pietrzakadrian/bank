/**
 *
 * RecentTransactions
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { makeUserIdSelector } from 'containers/App/selectors';
import {
  makeRecentTransactionsRecipientSelector,
  makeRecentTransactionsSenderSelector,
} from 'containers/DashboardPage/selectors';
import {
  getRecentTransactionsRecipientAction,
  getRecentTransactionsSenderAction,
} from 'containers/DashboardPage/actions';
import SoftWidgetHeader from 'components/App/SoftWidget/SoftWidgetHeader';
import SoftWidgetWrapper from 'components/App/SoftWidget/SoftWidgetWrapper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import messages from './messages';

function RecentTransactions({
  getRecentTransactionsRecipient,
  getRecentTransactionsSender,
}) {
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });
  useEffect(() => {
    getRecentTransactionsRecipient();
    getRecentTransactionsSender();
  }, []);

  return (
    <SoftWidgetWrapper shadow="false">
      <SoftWidgetHeader>
        <FormattedMessage {...messages.header} />
      </SoftWidgetHeader>
    </SoftWidgetWrapper>
  );
}

RecentTransactions.propTypes = {
  getRecentTransactionsRecipient: PropTypes.func,
  getRecentTransactionsSender: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  recentTransactionsRecipient: makeRecentTransactionsRecipientSelector(),
  recentTransactionsSender: makeRecentTransactionsSenderSelector(),
  userId: makeUserIdSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRecentTransactionsRecipient: () =>
      dispatch(getRecentTransactionsRecipientAction()),
    getRecentTransactionsSender: () =>
      dispatch(getRecentTransactionsSenderAction()),
    sortingData: data =>
      data.sort((a, b) => Date.parse(b.date_time) - Date.parse(a.date_time)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RecentTransactions);
