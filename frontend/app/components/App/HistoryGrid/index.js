/**
 *
 * HistoryGrid
 *
 */

import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MediaQuery from 'react-responsive';
import reducer from 'containers/HistoryPage/reducer';
import saga from 'containers/HistoryPage/saga';

// Import Components
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import {
  PagingState,
  GroupingState,
  RowDetailState,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import LoadingCircular from 'components/App/LoadingCircular';
import messages from './messages';
import LoadingWrapper from './LoadingWrapper';
import HeaderWrapper from './HeaderWrapper';
import TableCellWrapper from './TableCellWrapper';
import PercentTypeProvider from './PercentTypeProvider';
import GridDetailContainer from './GridDetailContainer';

// Import Utils
import { TABLET_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

// Import Actions
import {
  getGridDataAction,
  changePageAction,
  toggleRowDetailAction,
} from 'containers/HistoryPage/actions';

// Import Selectors
import {
  makeGridDataSelector,
  makePageSizeSelector,
  makeCurrentPageSelector,
  makeTotalCountSelector,
} from 'containers/HistoryPage/selectors';

const stateSelector = createStructuredSelector({
  gridData: makeGridDataSelector(),
  pageSize: makePageSizeSelector(),
  currentPage: makeCurrentPageSelector(),
  totalCount: makeTotalCountSelector(),
});

const key = 'historyPage';
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

export default function HistoryGrid() {
  const dispatch = useDispatch();
  const onChangePage = currentPage => dispatch(changePageAction(currentPage));
  const getGridData = () => dispatch(getGridDataAction());
  const onToggleRowDetail = () => dispatch(toggleRowDetailAction());
  const { gridData, currentPage, pageSize, totalCount } = useSelector(
    stateSelector,
  );

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (gridData.length === 0) getGridData();
  }, []);

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
