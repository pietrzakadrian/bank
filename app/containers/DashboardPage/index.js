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
import withAuth from '../../services/withAuth';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

// Import Material-UI

// Import Components
import AvailableFunds from './AvailableFunds';
import BankInformation from './BankInformation';
import AccountBills from './AccountBills';
import RecentTransactions from './RecentTransactions';
import AuthService from '../../services/AuthService';

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

    this.state = {
      id_owner: this.props.user.id,
      account_bill: Math.floor(10000000000 + Math.random() * 90000000000),
      available_funds: 0,
    };
    this.Auth = new AuthService();
  }

  componentWillMount() {
    this.Auth.createBill(
      this.state.id_owner,
      this.state.account_bill,
      this.state.available_funds,
    )
      .then(res => {
        if (res) {
          return 1;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Helmet title="Dashboard - Bank Application" />
        <div id="test" className={classes.informationHeader}>
          <div className={classes.informationHeaderFirst} />
          <div className={classes.informationHeaderLast}>
            Dzień dobry, {this.props.user.name} {this.props.user.surname}
            <br />
            Ostatnie logowanie: {this.props.user.last_logged}
          </div>
        </div>
        <div className={classes.container}>
          <Grid container spacing={24} className={classes.grid}>
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
            </Grid>

            {/* <Grid item xs={4}>
              <AccountBills />
            </Grid>
            <Grid item xs={4}>
              <AccountBills />
            </Grid>
            <Grid item xs={4}>
              <AccountBills />
            </Grid> */}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withAuth(withStyles(styles)(DashboardPage));
