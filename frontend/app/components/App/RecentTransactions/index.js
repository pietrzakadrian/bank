/**
 *
 * RecentTransactions
 *
 */

import React, { Fragment, useEffect } from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { format } from 'date-fns';
import AuthService from 'services/auth.service';
import { FormattedMessage } from 'react-intl';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';

// Import Components
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import { SoftWidgetHeader, SoftWidgetWrapper } from 'components/App/SoftWidget';
import LoadingWrapper from 'components/App/LoadingWrapper';
import { TableBodyWrapper } from 'components/App/Table';
import LoadingCircular from 'components/App/LoadingCircular';
import TableCellWrapper from './TableCellWrapper';
import RecentTransitionsSenderAmountWrapper from './RecentTransitionsSenderAmountWrapper';
import RecentTransitionsRecipientNameWrapper from './RecentTransitionsRecipientNameWrapper';
import RecentTransitionsWrapper from './RecentTransitionsWrapper';
import messages from './messages';

// Import Actions
import {
  getRecentTransactionsRecipientAction,
  getRecentTransactionsSenderAction,
} from 'containers/DashboardPage/actions';

// Import Selectors
import {
  makeRecentTransactionsRecipientSelector,
  makeRecentTransactionsSenderSelector,
} from 'containers/DashboardPage/selectors';

const stateSelector = createStructuredSelector({
  recentTransactionsRecipient: makeRecentTransactionsRecipientSelector(),
  recentTransactionsSender: makeRecentTransactionsSenderSelector(),
});

const key = 'dashboardPage';

function sortingData(data) {
  return data
    .sort((a, b) => Date.parse(b.date_time) - Date.parse(a.date_time))
    .slice(0, 4);
}

export default function RecentTransactions() {
  const auth = new AuthService();
  const userId = auth.getUserId();
  const dispatch = useDispatch();
  const getRecentTransactionsRecipient = () =>
    dispatch(getRecentTransactionsRecipientAction());
  const getRecentTransactionsSender = () =>
    dispatch(getRecentTransactionsSenderAction());
  const { recentTransactionsRecipient, recentTransactionsSender } = useSelector(
    stateSelector,
  );

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  useEffect(() => {
    if (recentTransactionsRecipient.length === 0)
      getRecentTransactionsRecipient();
    if (recentTransactionsSender.length === 0) getRecentTransactionsSender();
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
                        <RecentTransitionsWrapper>
                          {row.recipient.name} {row.recipient.surname}
                        </RecentTransitionsWrapper>
                      </RecentTransitionsRecipientNameWrapper>
                      <RecentTransitionsWrapper title="true">{row.transfer_title}</RecentTransitionsWrapper>
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
                      <RecentTransitionsRecipientNameWrapper>
                        <FormattedMessage {...messages.fromPayment} />{' '}
                        <RecentTransitionsWrapper>
                          {row.sender.name} {row.sender.surname}
                        </RecentTransitionsWrapper>
                      </RecentTransitionsRecipientNameWrapper>
                      <RecentTransitionsWrapper title="true">
                        {row.transfer_title}
                      </RecentTransitionsWrapper>
                    </TableCellWrapper>
                    <TableCellWrapper>
                      <div>{format(row.date_time, `DD.MM.YYYY`)}</div>
                      <RecentTransitionsSenderAmountWrapper>
                        {row.amount_money} {row.currency}
                      </RecentTransitionsSenderAmountWrapper>
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
