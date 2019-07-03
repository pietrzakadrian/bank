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
import { TABLET_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
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
import LoadingWrapper from './LoadingWrapper';
import HeaderWrapper from './HeaderWrapper';
import TableCellWrapper from './TableCellWrapper';
import PercentTypeProvider from './PercentTypeProvider';
import GridDetailContainer from './GridDetailContainer';

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
    if (gridData.length === 0) getGridData();
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
        <MediaQuery minWidth={TABLET_LANDSCAPE_VIEWPORT_WIDTH}>
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

HistoryGrid.propTypes = {
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
