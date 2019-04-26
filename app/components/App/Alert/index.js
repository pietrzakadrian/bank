/**
 *
 * Alert
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Import Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  makeOpenAlertSelector,
  makeCurrencyIdSelector,
} from '../../../containers/SettingsPage/selectors';
import {
  toggleAlertCurrencyAction,
  enterNewCurrencyAction,
} from '../../../containers/SettingsPage/actions';

/* eslint-disable react/prefer-stateless-function */
class Alert extends React.PureComponent {
  constructor(props) {
    super(props);

    this.enterCurrency = this.enterCurrency.bind(this);
  }

  enterCurrency() {
    this.props.enterNewCurrency(this.props.currencyId);
  }

  render() {
    return (
      <Dialog
        open={this.props.openAlert}
        onClose={this.props.onCurrencyToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Change currency</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are trying to change the currency. This will result in currency
            conversion of your available funds according to the exchange rate.
            Are you sure you want to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.onCurrencyToggle}>
            Disagree
          </Button>
          <Button color="primary" onClick={this.enterCurrency} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Alert.propTypes = {};

const mapStateToProps = createStructuredSelector({
  openAlert: makeOpenAlertSelector(),
  currencyId: makeCurrencyIdSelector(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCurrencyToggle: () => dispatch(toggleAlertCurrencyAction()),
    enterNewCurrency: currencyId =>
      dispatch(enterNewCurrencyAction(currencyId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alert);
