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
} from 'containers/HistoryPage/actions';
import {
  makeGridDataSelector,
  makePageSizeSelector,
  makeCurrentPageSelector,
  makeTotalCountSelector,
} from 'containers/HistoryPage/selectors';
import reducer from 'containers/HistoryPage/reducer';
import saga from 'containers/HistoryPage/saga';
import { withStyles } from '@material-ui/core';
import LoadingCircular from 'components/App/LoadingCircular';
import messages from './messages';
import HeaderDetailWrapper from './HeaderDetailWrapper';
import MainDetailWrapper from './MainDetailWrapper';
import LoadingWrapper from './LoadingWrapper';
import DetailContainerWrapper from './DetailContainerWrapper';

function HistoryGrid({
  gridData,
  currentPage,
  pageSize,
  totalCount,
  getGridData,
  onChangePage,
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
              <RowDetailState />
              <PercentTypeProvider for={formattedColumns} />
              <CustomPaging totalCount={totalCount} />
              <Table />
              <TableHeaderRow />
              <TableRowDetail contentComponent={GridDetailContainer} />

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

function PercentTypeProvider(props) {
  return <DataTypeProvider {...props} />;
}

function HeaderCellBase(classes, className, ...restProps) {
  return (
    <TableHeaderRow.Cell
      {...restProps}
      className={`${classes.text} ${className}`}
    />
  );
}

function TableCellBase(classes, className, ...restProps) {
  return (
    <Table.Cell {...restProps} className={`${classes.text} ${className}`} />
  );
}

function GridDetailContainerBase(row) {
  return (
    <DetailContainerWrapper>
      <MediaQuery maxWidth={TABLET_VIEWPORT_WIDTH}>
        {matches =>
          matches ? (
            <Fragment>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.sender} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{row.row.sender_name}</MainDetailWrapper>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.recipient} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{row.row.recipient_name}</MainDetailWrapper>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.accountNumber} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{row.row.account_bill}</MainDetailWrapper>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.transferTitle} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{row.row.transfer_title}</MainDetailWrapper>
            </Fragment>
          ) : (
            <div className="desktop--container">
              <div className="account--number">
                <HeaderDetailWrapper>
                  <FormattedMessage {...messages.accountNumber} />
                </HeaderDetailWrapper>
                <div>{row.row.account_bill}</div>
              </div>
            </div>
          )
        }
      </MediaQuery>
    </DetailContainerWrapper>
  );
}

const styles = {};

const GridDetailContainer = withStyles(styles, {
  name: 'ReduxIntegrationDemo',
})(GridDetailContainerBase);

const headerCellStyles = () => ({
  text: {
    fontSize: 16,
    color: '#0029ab',
    fontFamily: 'Lato',
  },
});

const HeaderCell = withStyles(headerCellStyles, { name: 'HeaderCellBase' })(
  HeaderCellBase,
);

const tableCellStyles = () => ({
  text: {
    fontSize: 14.5,
    fontFamily: 'Lato',
  },
});

const tableCell = withStyles(tableCellStyles, { name: 'TableCellBase' })(
  TableCellBase,
);

HistoryGrid.propTypes = {
  gridData: PropTypes.array,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  getGridData: PropTypes.func,
  onChangePage: PropTypes.func,
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(HistoryGrid);
