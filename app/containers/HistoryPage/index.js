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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  createGridAction,
  getGridDataAction,
  changePageAction,
} from './actions';
import makeSelectHistoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const lgColumns = [
  { name: 'date_time', title: <FormattedMessage {...messages.date} /> },
  { name: 'sender_name', title: <FormattedMessage {...messages.sender} /> },
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
const smColumns = [
  { name: 'date_time', title: <FormattedMessage {...messages.date} /> },
  { name: 'amount_money', title: <FormattedMessage {...messages.amount} /> },
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
    margin: '7px 0',
    paddingRight: 0,
    paddingLeft: 33,
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
    {window.matchMedia('(max-width: 678px)').matches ? (
      <Fragment>
        <div className={classes.headerDetail}>
          <FormattedMessage {...messages.sender} />
        </div>
        <div className={classes.TableInfoDetail}>{row.sender_name}</div>
        <div className={classes.headerDetail}>
          <FormattedMessage {...messages.recipient} />
        </div>
        <div className={classes.TableInfoDetail}>{row.recipient_name}</div>
        <div className={classes.headerDetail}>
          <FormattedMessage {...messages.accountNumber} />
        </div>
        <div className={classes.TableInfoDetail}>
          {row.account_bill
            .toString()
            .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
            .trim()}
        </div>
        <div className={classes.headerDetail}>
          <FormattedMessage {...messages.transferTitle} />
        </div>
        <div className={classes.TableInfoDetail}>{row.transfer_title}</div>
      </Fragment>
    ) : (
      <div className="desktop--container">
        <div className="account--number">
          <div className={classes.headerDetail}>
            <FormattedMessage {...messages.accountNumber} />
          </div>
          <div className={classes.TableInfoDetail}>
            {row.account_bill
              .toString()
              .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
              .trim()}
          </div>
        </div>
      </div>
    )}
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
    const { classes, historyPage, onCurrentPageChange } = this.props;

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
                <GroupingState />
                <PagingState
                  currentPage={historyPage.currentPage}
                  onCurrentPageChange={onCurrentPageChange}
                  pageSize={historyPage.pageSize}
                />
                <RowDetailState />
                <PercentTypeProvider for={historyPage.percentColumns} />
                <CustomPaging totalCount={historyPage.totalCount} />
                <Table cellComponent={tableCell} />
                <TableHeaderRow cellComponent={HeaderCell} />
                <TableRowDetail contentComponent={GridDetailContainer} />
                <PagingPanel />
              </Grid>
            ) : (
              <div className="loading--container">
                <LoadingCircular />
              </div>
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
    onCurrentPageChange: currentPage =>
      dispatch(createGridAction('currentPage', currentPage)),
    getGridData: () => dispatch(getGridDataAction()),
    onChangePage: currentPage => dispatch(changePageAction(currentPage)),
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
