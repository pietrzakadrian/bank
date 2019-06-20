/**
 *
 * AccountBills
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeUserIdSelector } from 'containers/App/selectors';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { getAccountBillsAction } from 'containers/DashboardPage/actions';
import {
  makeAvailableFundsSelector,
  makeAccountBillsSelector,
  makeCurrencySelector,
} from 'containers/DashboardPage/selectors';
import SoftWidgetHeader from 'components/App/SoftWidget/SoftWidgetHeader';
import SoftWidgetHeaderAction from 'components/App/SoftWidget/SoftWidgetHeaderAction';
import SoftWidgetWrapper from 'components/App/SoftWidget/SoftWidgetWrapper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import messages from './messages';
import LoadingCircular from '../LoadingCircular';
import TableCellWrapper from './TableCellWrapper';
import LoadingWrapper from './LoadingWrapper';
import AvailableFundsWrapper from './AvailableFundsWrapper';
import TableCellRightSide from './TableCellRightSide';
import TableCellLeftSide from './TableCellLeftSide';

function AccountBills({
  availableFunds,
  accountBills,
  currency,
  getAccountBills,
}) {
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });
  useEffect(() => {
    getAccountBills();
  }, []);

  return (
    <SoftWidgetWrapper>
      <SoftWidgetHeader>
        <FormattedMessage {...messages.bills} />
        <SoftWidgetHeaderAction>
          <SwapVertIcon /> <FormattedMessage {...messages.makeTransferBtn} />
        </SoftWidgetHeaderAction>
      </SoftWidgetHeader>
      <Table>
        <TableBody>
          {(availableFunds === 0 || availableFunds) &&
          accountBills &&
          currency ? (
            <TableRow onMouseDown={e => e.stopPropagation()}>
              <TableCellWrapper >
                <TableCellLeftSide>
                  {accountBills}
                  </TableCellLeftSide>
              </TableCellWrapper>
              <TableCellWrapper>
                <TableCellRightSide>
                <AvailableFundsWrapper>
                {availableFunds}
                  </AvailableFundsWrapper> 
                  {' '}
                  <span>
                  {currency}
                  </span>
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

AccountBills.propTypes = {
  getAccountBills: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  availableFunds: makeAvailableFundsSelector(),
  accountBills: makeAccountBillsSelector(),
  currency: makeCurrencySelector(),
  userId: makeUserIdSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAccountBills: () => dispatch(getAccountBillsAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AccountBills);
