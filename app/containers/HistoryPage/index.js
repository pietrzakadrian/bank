/* eslint-disable react/prefer-stateless-function */
/**
 *
 * HistoryPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ResizeObserver from 'react-resize-observer';

// Import Components
import Copyright from 'components/Copyright';
import LoadingCircular from 'components/App/LoadingCircular';

// Import Material-UI
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  SelectionState,
  PagingState,
  GroupingState,
  RowDetailState,
  IntegratedGrouping,
  IntegratedPaging,
  DataTypeProvider,
  IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  PagingPanel,
  TableColumnReordering,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { createGridAction, getGridDataAction } from './actions';

import makeSelectHistoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const lgColumns = [
  { name: 'date_time', title: 'Date' },
  { name: 'sender_name', title: 'Sender' },
  { name: 'recipient_name', title: 'Recipient' },
  { name: 'transfer_title', title: 'Transfer title' },
  { name: 'amount_money', title: 'Amount of money' },
];
const smColumns = [
  { name: 'date_time', title: 'Date' },
  { name: 'amount_money', title: 'Amount' },
];

const styles = theme => ({
  container: {
    position: 'relative',
    margin: '10px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 1100,
      width: 'calc(100% - 70px)',
    },
  },
  detailContainer: {
    margin: '10px 0',
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize,
  },
  elevation: {
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      marginTop: -10,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 20,
    },
  },
  tableHeaderRowDetail: {
    padding: 0,
  },
  tableRoot: {
    padding: 0,
  },
  headerDetail: {
    fontSize: 16,
    color: '#0029ab',
    fontFamily: 'Lato',
  },
  TableInfoDetail: {
    fontSize: 14.5,
    fontFamily: 'Lato',
    marginBottom: 10,
  },
});
const PercentFormatter = ({ value }) =>
  !value.toString().indexOf('-') ? (
    <span className="percent">
      {value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',')}{' '}
    </span>
  ) : (
    <span>
      {value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ').replace('.', ',')}{' '}
    </span>
  );

const PercentTypeProvider = props => (
  <DataTypeProvider formatterComponent={PercentFormatter} {...props} />
);

const GridDetailContainerBase = ({ row, classes }) => (
  <div className={classes.detailContainer}>
    <div className={classes.headerDetail}> Sender</div>
    <div className={classes.TableInfoDetail}>{row.result.amount_money}</div>
    <div className={classes.headerDetail}>Account bill</div>
    <div className={classes.TableInfoDetail}>
      42 9760 4671 5909 2300 0022 0097
    </div>
    <div className={classes.headerDetail}>Recipient</div>
    <div className={classes.TableInfoDetail}>Adrian Pietrzak</div>
    <div className={classes.headerDetail}>Transfer title</div>
    <div className={classes.TableInfoDetail}>no siema</div>
  </div>
);

const GridDetailContainer = withStyles(styles, {
  name: 'ReduxIntegrationDemo',
})(GridDetailContainerBase);

const HeaderCellBase = ({ classes, className, ...restProps }) => (
  <TableHeaderRow.Cell
    {...restProps}
    className={`${classes.text} ${className}`}
  />
);

const headerCellStyles = theme => ({
  text: {
    fontSize: 16,
    color: '#0029ab',
    fontFamily: 'Lato',
  },
});

const HeaderCell = withStyles(headerCellStyles, { name: 'HeaderCellBase' })(
  HeaderCellBase,
);

const TableCellBase = ({ classes, className, ...restProps }) => (
  <Table.Cell {...restProps} className={`${classes.text} ${className}`} />
);

const tableCellStyles = theme => ({
  text: {
    fontSize: 14.5,
    fontFamily: 'Lato',
  },
});

const tableCell = withStyles(tableCellStyles, { name: 'TableCellBase' })(
  TableCellBase,
);

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.getGridData();
  }

  render() {
    const {
      classes,
      historyPage,
      onSelectionChange,
      onExpandedRowIdsChange,
      onGroupingChange,
      onExpandedGroupsChange,
      onCurrentPageChange,
      onPageSizeChange,
      onColumnOrderChange,
      onHiddenColumnNamesChange,
    } = this.props;

    return (
      <Fragment>
        <FormattedMessage {...messages.helmetHistoryTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>

        <div className={classes.container}>
          <Paper
            classes={{
              elevation2: classes.elevation,
            }}
          >
            {historyPage.rowsTransform ? (
              <Grid
                rows={historyPage.rowsTransform}
                columns={
                  window.matchMedia('(min-width: 678px)').matches
                    ? lgColumns
                    : smColumns
                }
              >
                <GroupingState
                  onGroupingChange={onGroupingChange}
                  onExpandedGroupsChange={onExpandedGroupsChange}
                />
                <PagingState
                  currentPage={historyPage.currentPage}
                  onCurrentPageChange={onCurrentPageChange}
                  pageSize={historyPage.pageSize}
                  onPageSizeChange={onPageSizeChange}
                />
                <RowDetailState
                  expandedRowIds={historyPage.historyPageexpandedRowIds}
                  onExpandedRowIdsChange={onExpandedRowIdsChange}
                />
                <SelectionState
                  selection={historyPage.selection}
                  onSelectionChange={onSelectionChange}
                />
                <IntegratedGrouping />
                <IntegratedPaging />
                <IntegratedSelection />

                <PercentTypeProvider for={historyPage.percentColumns} />
                <Table cellComponent={tableCell} />

                <TableHeaderRow cellComponent={HeaderCell} />
                <TableColumnVisibility
                  hiddenColumnNames={historyPage.hiddenColumnNames}
                  onHiddenColumnNamesChange={onHiddenColumnNamesChange}
                />
                <TableColumnReordering
                  order={historyPage.columnOrder}
                  onOrderChange={onColumnOrderChange}
                />
                <TableRowDetail contentComponent={GridDetailContainer} />
                <PagingPanel />
              </Grid>
            ) : (
              <LoadingCircular />
            )}
          </Paper>
        </div>
        <Copyright />
      </Fragment>
    );
  }
}

HistoryPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  historyPage: makeSelectHistoryPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSortingChange: sorting => dispatch(createGridAction('sorting', sorting)),
    onSelectionChange: selection =>
      dispatch(createGridAction('selection', selection)),
    onExpandedRowIdsChange: expandedRowIds =>
      dispatch(createGridAction('expandedRowIds', expandedRowIds)),
    onGroupingChange: grouping =>
      dispatch(createGridAction('grouping', grouping)),
    onExpandedGroupsChange: expandedGroups =>
      dispatch(createGridAction('expandedGroups', expandedGroups)),
    onFiltersChange: filters => dispatch(createGridAction('filters', filters)),
    onCurrentPageChange: currentPage =>
      dispatch(createGridAction('currentPage', currentPage)),
    onPageSizeChange: pageSize =>
      dispatch(createGridAction('pageSize', pageSize)),
    onColumnOrderChange: order =>
      dispatch(createGridAction('columnOrder', order)),
    onColumnWidthsChange: widths =>
      dispatch(createGridAction('columnWidths', widths)),
    onHiddenColumnNamesChange: hiddenColumns =>
      dispatch(createGridAction('hiddenColumnNames', hiddenColumns)),
    getGridData: () => dispatch(getGridDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'historyPage', reducer });
const withSaga = injectSaga({ key: 'historyPage', saga });

export default compose(
  withStyles(styles),
  withReducer,
  withSaga,
  withConnect,
)(HistoryPage);
