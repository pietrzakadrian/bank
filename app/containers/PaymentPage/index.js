/*
 * Payment
 *
 * This is the first page thing users see of our App after logging in, at the '/login' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import '../LoginPage/Login.css';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';

import { FormattedMessage } from 'react-intl';
import AuthService from '../../services/AuthService';
import withAuth from '../../services/withAuth';
import messages from './messages';

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  container: {
    margin: '10px auto',
    width: '1100px',
  },
  center: {
    textAlign: 'center',
  },
});

class PaymentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_sender: this.props.user.id,
      account_bill: '',
      amount_money: '',
      transfer_title: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.makePayment(
      this.state.id_sender,
      this.state.account_bill,
      this.state.amount_money,
      this.state.transfer_title,
    )
      .then(res => {
        if (res) {
          this.props.history.replace('/dashboard');
        } else {
          this.setState({
            error: 'Error',
          });
        }
      })
      .catch(err => {
        this.setState({
          error: 'Error catch',
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.center}>
        <form noValidate onSubmit={this.handleFormSubmit}>
          <input
            className="form-item"
            // TODO: change id to account_bill
            placeholder="account_bill..."
            name="account_bill"
            type="text"
            onChange={this.handleChange}
          />
          <br />
          <input
            className="form-item"
            placeholder="Amount money"
            name="amount_money"
            type="text"
            onChange={this.handleChange}
          />
          <br />
          <input
            className="form-item"
            placeholder="Transfer title"
            name="transfer_title"
            type="text"
            onChange={this.handleChange}
          />
          {this.state.error}
          <br />
          <input value="SUBMIT" type="submit" />
        </form>
      </div>
    );
  }
}

PaymentPage.propTypes = {
  classes: PropTypes.object,
};

export default withAuth(withStyles(styles)(PaymentPage));
