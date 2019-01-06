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
import Grid from '@material-ui/core/Grid';
import GridLayout from 'react-grid-layout';
import withAuth from '../../services/withAuth';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

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
          <GridLayout className="layout" cols={9} rowHeight={30} width={1100}>
            <div key="a" data-grid={{ x: 0, y: 0, w: 3, h: 3, static: true }}>
              <AvailableFunds id={this.props.user.id} />
            </div>
            <div key="b" data-grid={{ x: 3, y: 0, w: 3, h: 3, static: true }}>
              <BankInformation />
            </div>
            <div key="c" data-grid={{ x: 6, y: 0, w: 3, h: 3, static: true }}>
              <BankInformation />
            </div>
            <div
              key="d"
              data-grid={{ x: 0, y: 1, w: 6, h: 7, maxW: 6, minW: 6 }}
            >
              <AccountBills id={this.props.user.id} />
            </div>
            <div
              key="e"
              data-grid={{ x: 6, y: 1, w: 3, h: 7, maxW: 3, minW: 3 }}
            >
              <RecentTransactions id={this.props.user.id} />
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
