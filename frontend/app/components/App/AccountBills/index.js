/* eslint-disable indent */
/**
 *
 * AccountBills
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';

// Import Components
import SwapVertIcon from '@material-ui/icons/SwapVert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import LinkWrapper from 'components/App/LinkWrapper';
import {
  SoftWidgetHeader,
  SoftWidgetWrapper,
  SoftWidgetHeaderAction,
} from 'components/App/SoftWidget';
import LoadingWrapper from 'components/App/LoadingWrapper';
import { TableCellRightSide, TableCellLeftSide } from 'components/App/Table';
import LoadingCircular from 'components/App/LoadingCircular';
import TableCellWrapper from './TableCellWrapper';
import AvailableFundsWrapper from './AvailableFundsWrapper';
import messages from './messages';

// Import Actions
import { getAccountBillsAction } from 'containers/DashboardPage/actions';

// Import Selectors
import {
  makeAvailableFundsSelector,
  makeAccountBillsSelector,
  makeCurrencySelector,
} from 'containers/DashboardPage/selectors';

const stateSelector = createStructuredSelector({
  availableFunds: makeAvailableFundsSelector(),
  accountBills: makeAccountBillsSelector(),
  currency: makeCurrencySelector(),
});

const key = 'dashboardPage';

export default function AccountBills() {
  const dispatch = useDispatch();
  const getAccountBills = () => dispatch(getAccountBillsAction());
  const { availableFunds, accountBills, currency } = useSelector(stateSelector);

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  useEffect(() => {
    if (!accountBills) getAccountBills();
  }, []);

  return (
    <SoftWidgetWrapper>
      <SoftWidgetHeader>
        <FormattedMessage {...messages.bills} />
        <LinkWrapper to="/payment">
          <SoftWidgetHeaderAction onMouseDown={e => e.stopPropagation()}>
            <SwapVertIcon /> <FormattedMessage {...messages.makeTransferBtn} />
          </SoftWidgetHeaderAction>
        </LinkWrapper>
      </SoftWidgetHeader>
      <Table>
        <TableBody>
          {(availableFunds === 0 || availableFunds) &&
          accountBills &&
          currency ? (
            <TableRow onMouseDown={e => e.stopPropagation()}>
              <TableCellWrapper>
                <TableCellLeftSide>{accountBills}</TableCellLeftSide>
              </TableCellWrapper>
              <TableCellWrapper>
                <TableCellRightSide>
                  <AvailableFundsWrapper>
                    {availableFunds}
                  </AvailableFundsWrapper>{' '}
                  <span>{currency}</span>
                </TableCellRightSide>
              </TableCellWrapper>
            </TableRow>
          ) : (
            <TableRow>
              <TableCellWrapper loading="true">
                <LoadingWrapper>
                  <LoadingCircular />
                </LoadingWrapper>
              </TableCellWrapper>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </SoftWidgetWrapper>
  );
}
