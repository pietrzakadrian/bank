/*
 * Dashboard
 *
 * This is the first page thing users see of our App after logging in, at the '/dashboard' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';
import withAuth from '../../services/withAuth';
import './styles.css';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// Import Material-UI

// Import Components
import AvailableFunds from './AvailableFunds';
import BankInformation from './BankInformation';
import AccountBills from './AccountBills';
import RecentTransactions from './RecentTransactions';
import AuthService from '../../services/AuthService';
import GreetingHeadline from './GreetingHeadline';

// Import Styles
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  grid: {
    width: '100%',
    margin: '-12px auto',
  },
  container: {
    margin: '10px auto',
    width: '1100px',
  },
  informationHeader: {
    display: 'flex',
    fontSize: 13.5,
    paddingBottom: 5,
    marginTop: '-10px',
  },
  informationHeaderFirst: {
    flex: 1,
  },
  informationHeaderLast: {
    textAlign: 'right',
  },
  gridItem: {
    cursor: 'move',
  },
});

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Helmet title="Dashboard · Bank Application" />

        <GreetingHeadline id={this.props.user.id} />
        <div className={classes.container}>
          <GridLayout
            className="layout"
            cols={3}
            rowHeight={9}
            width={1100}
            margin={[20, 10]}
            isResizable={false}
          >
            <div key="a" data-grid={{ x: 0, y: 0, w: 1, h: 6, static: true }}>
              <AvailableFunds id={this.props.user.id} />
            </div>
            <div key="b" data-grid={{ x: 1, y: 0, w: 1, h: 6, static: true }}>
              <BankInformation />
            </div>
            <div key="c" data-grid={{ x: 2, y: 0, w: 1, h: 6, static: true }}>
              <BankInformation />
            </div>

            {/* 2 belka */}

            <div
              key="d"
              data-grid={{
                x: 0,
                y: 2,
                w: 2,
                h: 14,
              }}
              className={classes.gridItem}
            >
              <AccountBills id={this.props.user.id} />
            </div>
            <div
              key="e"
              data-grid={{
                x: 2,
                y: 2,
                w: 1,
                h: 14,
              }}
              className={classes.gridItem}
            >
              <RecentTransactions id={this.props.user.id} />
            </div>

            {/* 2 belka */}

            <div
              key="f"
              data-grid={{
                x: 0,
                y: 3,
                w: 1,
                h: 14,
              }}
              className={classes.gridItem}
            >
              <AccountBills id={this.props.user.id} />
            </div>

            <div
              key="g"
              data-grid={{
                x: 1,
                y: 3,
                w: 1,
                h: 14,
              }}
            >
              <AccountBills id={this.props.user.id} />
            </div>

            <div
              key="h"
              data-grid={{
                x: 2,
                y: 2,
                w: 1,
                h: 14,
              }}
              className={classes.gridItem}
            >
              <AccountBills id={this.props.user.id} />
            </div>
          </GridLayout>

          {/* <Grid container spacing={24} className={classes.grid}>
            <Grid item xs={4}>
              <AvailableFunds id={this.props.user.id} />
            </Grid>
            <Grid item xs={4}>
              <BankInformation />
            </Grid>
            <Grid item xs={4}>
              <BankInformation />
            </Grid>
            <Grid item xs={8}>
              <AccountBills id={this.props.user.id} />
            </Grid>
            <Grid item xs={4}>
              <RecentTransactions id={this.props.user.id} />
            </Grid> */}

          {/* <Grid item xs={4}>
              <AccountBills />
            </Grid>
            <Grid item xs={4}>
              <AccountBills />
            </Grid>
            <Grid item xs={4}>
              <AccountBills />
            </Grid> */}
          {/* </Grid> */}
        </div>
      </Fragment>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withAuth(withStyles(styles)(DashboardPage));
