/* eslint-disable radix */
/**
 *
 * CurrencyToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './styles.css';

// Import Components
import { makeCurrencySelector } from 'containers/RegisterPage/selectors';
import Toggle from './Toggle';
import messages from './messages';

import { changeCurrencyAction } from '../../containers/RegisterPage/actions';

class CurrencyToggle extends React.PureComponent {
  render() {
    return (
      <Toggle
        value={this.props.currencyId}
        values={this.props.currency}
        messages={messages}
        onToggle={this.props.onCurrencyToggle}
      />
    );
  }
}

CurrencyToggle.propTypes = {
  currencyId: PropTypes.number,
  currency: PropTypes.array,
  onCurrencyToggle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currency: makeCurrencySelector(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCurrencyToggle: evt =>
      dispatch(changeCurrencyAction(parseInt(evt.target.value))),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyToggle);
