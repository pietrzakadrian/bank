/**
 *
 * CurrencyToggle
 *
 */

/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeCurrencySelector,
  makeCurrencyIdSelector,
} from 'containers/RegisterPage/selectors';
import { changeCurrencyAction } from 'containers/RegisterPage/actions';

// Import Components
import Toggle from './Toggle';
import messages from './messages';

export function CurrencyToggle({ currency, currencyId, onChangeCurrency }) {
  return (
    <Toggle
      value={currencyId}
      values={currency}
      messages={messages}
      onToggle={onChangeCurrency}
    />
  );
}

CurrencyToggle.propTypes = {
  currencyId: PropTypes.number,
  currency: PropTypes.array,
  onChangeCurrency: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currency: makeCurrencySelector(),
  currencyId: makeCurrencyIdSelector(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCurrency: evt =>
      dispatch(changeCurrencyAction(parseInt(evt.target.value, 10))),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyToggle);
