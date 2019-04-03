/**
 *
 * HistoryPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// Import Material-UI
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableColumnVisibility,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { generateRows, testBank } from './demo-data/generator';
import makeSelectHistoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Statistics from './Statistics';

const CurrencyFormatter = ({ value }) => (
  <span style={{ color: '#ea0000' }}>
    -
    {value
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      .replace('.', ',')}{' '}
    USD
  </span>
);

const CurrencyTypeProvider = props => (
  <DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />
);

const headerCellStyles = theme => ({
  text: {
    color: 'black',
    backgroundColor: '#f7f7f7',
    fontSize: 17,
  },
});
const HeaderCellBase = ({ classes, className, ...restProps }) => (
  <TableHeaderRow.Cell
    {...restProps}
    className={`${classes.text} ${className}`}
  />
);

const TableCellBase = ({ classes, className, ...restProps }) => (
  <Table.Cell {...restProps} className={`${classes.text} ${className}`} />
);

const TableCellStyles = theme => ({
  text: {
    fontSize: 14.5,
  },
  backgroundColor: '#fefefe',
});

const HeaderCell = withStyles(headerCellStyles, { name: 'HeaderCellBase' })(
  HeaderCellBase,
);

const TableCell = withStyles(TableCellStyles, { name: 'TableCellBase' })(
  TableCellBase,
);

// Import Styles
const styles = theme => ({
  center: {
    textAlign: 'center',
    maxWidth: 1100,
    margin: '0 auto',
  },
  elevation2: {
    boxShadow: 'none',
  },
  tableBodyContainer: {
    backgroundColor: '#fefefe',
  },
});
class HistoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'date', title: 'Date' },
        { name: 'sender', title: 'Sender' },
        { name: 'recipient', title: 'Recipient' },
        { name: 'transferTitle', title: 'Transfer title' },
        { name: 'amount', title: 'Amount of money' },
      ],
      rows: generateRows({ columnValues: testBank, length: 13 }),
      currencyColumns: ['amount'],
      defaultHiddenColumnNames: ['transferTitle', 'date'],
    };
  }

  render() {
    const {
      rows,
      columns,
      currencyColumns,
      defaultHiddenColumnNames,
    } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <FormattedMessage {...messages.helmetHistoryTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>

        <div className={classes.center}>
          <Statistics />
          <div className={classes.historyContainer}>
            <Paper classes={{ elevation2: classes.elevation2 }}>
              <Grid rows={rows} columns={columns}>
                <Table cellComponent={TableCell} />
                <TableHeaderRow cellComponent={HeaderCell} />
                <TableColumnVisibility
                  defaultHiddenColumnNames={defaultHiddenColumnNames}
                />
                <CurrencyTypeProvider for={currencyColumns} />
              </Grid>
            </Paper>
          </div>
        </div>
      </Fragment>
    );
  }
}

HistoryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  historyPage: makeSelectHistoryPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
