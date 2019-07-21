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
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Import Components
import Toggle from './Toggle';
import messages from './messages';

// Import Actions
import { changeCurrencyAction } from 'containers/RegisterPage/actions';

// Import Selectors
import {
  makeCurrencySelector,
  makeCurrencyIdSelector,
} from 'containers/RegisterPage/selectors';

const stateSelector = createStructuredSelector({
  currency: makeCurrencySelector(),
  currencyId: makeCurrencyIdSelector(),
});

export default function CurrencyToggle() {
  const dispatch = useDispatch();
  const onChangeCurrency = e =>
    dispatch(changeCurrencyAction(parseInt(e.target.value, 10)));
  const { currency, currencyId } = useSelector(stateSelector);

  return (
    <Toggle
      value={currencyId}
      values={currency}
      messages={messages}
      onToggle={onChangeCurrency}
    />
  );
}
