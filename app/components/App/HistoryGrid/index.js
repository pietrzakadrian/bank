/**
 *
 * HistoryGrid
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  PagingState,
  GroupingState,
  RowDetailState,
  DataTypeProvider,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import MediaQuery from 'react-responsive';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';
import {
  getGridDataAction,
  changePageAction,
  toggleRowDetailAction,
} from 'containers/HistoryPage/actions';
import {
  makeGridDataSelector,
  makePageSizeSelector,
  makeCurrentPageSelector,
  makeTotalCountSelector,
} from 'containers/HistoryPage/selectors';
import reducer from 'containers/HistoryPage/reducer';
import saga from 'containers/HistoryPage/saga';
import LoadingCircular from 'components/App/LoadingCircular';
import messages from './messages';
import HeaderDetailWrapper from './HeaderDetailWrapper';
import MainDetailWrapper from './MainDetailWrapper';
import LoadingWrapper from './LoadingWrapper';
import DetailContainerWrapper from './DetailContainerWrapper';
import AmountWrapper from './AmountWrapper';
import HeaderWrapper from './HeaderWrapper';
import TableCellWrapper from './TableCellWrapper';

function HistoryGrid({
  gridData,
  currentPage,
  pageSize,
  totalCount,
  getGridData,
  onChangePage,
  onToggleRowDetail,
}) {
  useInjectReducer({ key: 'historyPage', reducer });
  useInjectSaga({ key: 'historyPage', saga });
  useEffect(() => {
    getGridData();
  }, []);

  const formattedColumns = ['amount_money'];
  const largeColumns = [
    { name: 'date_time', title: <FormattedMessage {...messages.date} /> },
    { name: `sender_name`, title: <FormattedMessage {...messages.sender} /> },
    {
      name: 'recipient_name',
      title: <FormattedMessage {...messages.recipient} />,
    },
    {
      name: 'transfer_title',
      title: <FormattedMessage {...messages.transferTitle} />,
    },
    {
      name: 'amount_money',
      title: <FormattedMessage {...messages.amount} />,
    },
  ];
  const smallColumns = [
    { name: 'date_time', title: <FormattedMessage {...messages.date} /> },
    { name: 'amount_money', title: <FormattedMessage {...messages.amount} /> },
  ];

  return (
    <Fragment>
      {gridData.length ? (
        <MediaQuery minWidth={TABLET_VIEWPORT_WIDTH}>
          {matches => (
            <Grid
              rows={gridData}
              columns={matches ? largeColumns : smallColumns}
            >
              <GroupingState />
              <PagingState
                currentPage={currentPage}
                onCurrentPageChange={onChangePage}
                pageSize={pageSize}
              />
              <RowDetailState onExpandedRowIdsChange={onToggleRowDetail} />
              <PercentTypeProvider for={formattedColumns} />
              <CustomPaging totalCount={totalCount} />
              <Table cellComponent={TableCellWrapper} />
              <TableHeaderRow cellComponent={HeaderWrapper} />
              <TableRowDetail contentComponent={GridDetailContainerBase} />

              <FormattedMessage {...messages.of}>
                {of => (
                  <PagingPanel
                    messages={{
                      info: `{from}-{to} ${of} {count}`,
                    }}
                  />
                )}
              </FormattedMessage>
            </Grid>
          )}
        </MediaQuery>
      ) : (
        <LoadingWrapper>
          <LoadingCircular />
        </LoadingWrapper>
      )}
    </Fragment>
  );
}

function GridDetailContainerBase({ row }) {
  const { sender_name, recipient_name, account_bill, transfer_title } = row;

  return (
    <DetailContainerWrapper>
      <MediaQuery maxWidth={TABLET_VIEWPORT_WIDTH}>
        {matches =>
          matches ? (
            <Fragment>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.sender} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{sender_name}</MainDetailWrapper>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.recipient} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{recipient_name}</MainDetailWrapper>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.accountNumber} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{account_bill}</MainDetailWrapper>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.transferTitle} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{transfer_title}</MainDetailWrapper>
            </Fragment>
          ) : (
            <Fragment>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.accountNumber} />
              </HeaderDetailWrapper>
              <div>{account_bill}</div>
            </Fragment>
          )
        }
      </MediaQuery>
    </DetailContainerWrapper>
  );
}

function PercentTypeProvider(props) {
  return <DataTypeProvider formatterComponent={AmountFormatter} {...props} />;
}

function AmountFormatter({ value }) {
  return !value.indexOf('-') ? (
    <AmountWrapper>{value}</AmountWrapper>
  ) : (
    <span>{value}</span>
  );
}

HistoryGrid.propTypes = {
  row: PropTypes.object,
  value: PropTypes.number,
  gridData: PropTypes.array,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  getGridData: PropTypes.func,
  onChangePage: PropTypes.func,
  onToggleRowDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  gridData: makeGridDataSelector(),
  pageSize: makePageSizeSelector(),
  currentPage: makeCurrentPageSelector(),
  totalCount: makeTotalCountSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGridData: () => dispatch(getGridDataAction()),
    onChangePage: currentPage => dispatch(changePageAction(currentPage)),
    onToggleRowDetail: () => dispatch(toggleRowDetailAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HistoryGrid);
