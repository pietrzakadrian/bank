/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { appLocales } from 'i18n';

// Import Components
import Toggle from './Toggle';
import messages from './messages';

// Import Actions
import { changeLocaleAction } from 'containers/LanguageProvider/actions';

// Import Selectors
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

const stateSelector = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export default function LocaleToggle() {
  const dispatch = useDispatch();
  const onLocaleToggle = evt => dispatch(changeLocaleAction(evt.target.value));
  const { locale } = useSelector(stateSelector);

  return (
    <Toggle
      value={locale}
      values={appLocales}
      messages={messages}
      onToggle={onLocaleToggle}
    />
  );
}
