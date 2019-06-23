/**
 *
 * RecentTransactions
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns';
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

// Import Components
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import SoftWidgetHeader from 'components/App/SoftWidget/SoftWidgetHeader';
import SoftWidgetWrapper from 'components/App/SoftWidget/SoftWidgetWrapper';
import LoadingWrapper from 'components/App/LoadingWrapper';
import TableBodyWrapper from 'components/App/Table/TableBodyWrapper';
import LoadingCircular from 'components/App/LoadingCircular';
import TableCellWrapper from './TableCellWrapper';
import RecentTransitionsSenderAmountWrapper from './RecentTransitionsSenderAmountWrapper';
import RecentTransitionsRecipientNameWrapper from './RecentTransitionsRecipientNameWrapper';
import RecentTransitionsTitleWrapper from './RecentTransitionsTitleWrapper';
import messages from './messages';

function RecentTransactions({
  recentTransactionsRecipient,
  recentTransactionsSender,
  userId,
  getRecentTransactionsRecipient,
  getRecentTransactionsSender,
}) {
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });
  useEffect(() => {
    getRecentTransactionsRecipient();
    getRecentTransactionsSender();
  }, []);

  let index = 0;

  return (
    <SoftWidgetWrapper noShadow>
      <SoftWidgetHeader noBackground>
        <FormattedMessage {...messages.recentTransactions} />
      </SoftWidgetHeader>

      {recentTransactionsRecipient && recentTransactionsSender ? (
        <Table>
          <TableBodyWrapper>
            {sortingData([
              ...recentTransactionsRecipient,
              ...recentTransactionsSender,
            ]).map(row => (
              <TableRow key={index++} onMouseDown={e => e.stopPropagation()}>
                {row.id_sender === userId ? (
                  <Fragment>
                    <TableCellWrapper recent="true">
                      <RecentTransitionsRecipientNameWrapper>
                        <FormattedMessage {...messages.toPayment} />{' '}
                        <RecentTransitionsTitleWrapper>
                          {row.recipient.name} {row.recipient.surname}
                        </RecentTransitionsTitleWrapper>
                      </RecentTransitionsRecipientNameWrapper>
                      <div>{row.transfer_title}</div>
                    </TableCellWrapper>
                    <TableCellWrapper>
                      <div>{format(row.date_time, `DD.MM.YYYY`)}</div>
                      <RecentTransitionsSenderAmountWrapper>
                        {row.amount_money} {row.currency}
                      </RecentTransitionsSenderAmountWrapper>
                    </TableCellWrapper>
                  </Fragment>
                ) : (
                  <Fragment>
                    <TableCellWrapper>
                      <div>
                        <FormattedMessage {...messages.fromPayment} />
                        {row.sender.name} {row.sender.surname}
                      </div>
                      <RecentTransitionsTitleWrapper>
                        {row.transfer_title}
                      </RecentTransitionsTitleWrapper>
                    </TableCellWrapper>
                    <TableCellWrapper>
                      <div>{format(row.date_time, `DD.MM.YYYY`)}</div>
                      <div>
                        {row.amount_money} {row.currency}
                      </div>
                    </TableCellWrapper>
                  </Fragment>
                )}
              </TableRow>
            ))}
          </TableBodyWrapper>
        </Table>
      ) : (
        <LoadingWrapper>
          <LoadingCircular />
        </LoadingWrapper>
      )}
    </SoftWidgetWrapper>
  );
}

function sortingData(data) {
  return data
    .sort((a, b) => Date.parse(b.date_time) - Date.parse(a.date_time))
    .slice(0, 4);
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RecentTransactions);
