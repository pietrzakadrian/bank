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
import { getAccountBillsAction } from 'containers/DashboardPage/actions';
import {
  makeAvailableFundsSelector,
  makeAccountBillsSelector,
  makeCurrencySelector,
} from 'containers/DashboardPage/selectors';

// Import Components
import SwapVertIcon from '@material-ui/icons/SwapVert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import SoftWidgetHeader from 'components/App/SoftWidget/SoftWidgetHeader';
import SoftWidgetHeaderAction from 'components/App/SoftWidget/SoftWidgetHeaderAction';
import SoftWidgetWrapper from 'components/App/SoftWidget/SoftWidgetWrapper';
import LoadingWrapper from 'components/App/LoadingWrapper';
import TableCellRightSide from 'components/App/Table/TableCellRightSide';
import TableCellLeftSide from 'components/App/Table/TableCellLeftSide';
import LoadingCircular from 'components/App/LoadingCircular';
import TableCellWrapper from './TableCellWrapper';
import AvailableFundsWrapper from './AvailableFundsWrapper';
import messages from './messages';

function AccountBills({
  availableFunds,
  accountBills,
  currency,
  getAccountBills,
}) {
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });
  useEffect(() => {
    if (!accountBills) getAccountBills();
  }, []);

  return (
    <SoftWidgetWrapper>
      <SoftWidgetHeader>
        <FormattedMessage {...messages.bills} />
        <SoftWidgetHeaderAction onMouseDown={e => e.stopPropagation()}>
          <SwapVertIcon /> <FormattedMessage {...messages.makeTransferBtn} />
        </SoftWidgetHeaderAction>
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

AccountBills.propTypes = {
  availableFunds: PropTypes.string,
  accountBills: PropTypes.string,
  currency: PropTypes.string,
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
