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

// Import Material-UI
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  SortingState,
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

import { createGridAction } from './actions';

import makeSelectHistoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const lgColumns = [
  { name: 'date', title: 'Date' },
  { name: 'firstName', title: 'Sender' },
  { name: 'lastName', title: 'Recipient' },
  { name: 'birthDate', title: 'Transfer title' },
  { name: 'position', title: 'Amount of money' },
];
const smColumns = [
  { name: 'date', title: 'Date' },
  { name: 'position', title: 'Amount' },
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
  detailContainer: {
    marginTop: 10,
    marginLeft: 32.5,
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
const PercentFormatter = ({ value }) => (
  <span className="percent">
    {value} <FormattedMessage {...messages.currency} />
  </span>
);

const PercentTypeProvider = props => (
  <DataTypeProvider formatterComponent={PercentFormatter} {...props} />
);

const GridDetailContainerBase = ({ row, classes }) => (
  <div className={classes.detailContainer}>
    <div className={classes.headerDetail}> Sender</div>
    <div className={classes.TableInfoDetail}>Adrian Pietrzak</div>
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
  render() {
    const {
      classes,
      historyPage,
      onSortingChange,
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
            <Grid
              rows={historyPage.rows}
              columns={
                window.matchMedia('(min-width: 678px)').matches
                  ? lgColumns
                  : smColumns
              }
            >
              <SortingState
                sorting={historyPage.sorting}
                onSortingChange={onSortingChange}
              />
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
