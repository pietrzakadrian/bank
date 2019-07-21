/* eslint-disable indent */
/**
 *
 * GreetingHeader
 *
 */

import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { format } from 'date-fns';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';

// Import Components
import HeadlineWrapper from './HeadlineWrapper';
import HeadlineNameWrapper from './HeadlineNameWrapper';
import TextWrapper from './TextWrapper';
import messages from './messages';

// Import Actions
import {
  getNameAction,
  getSurnameAction,
  getLastPresentLoggedAction,
  getLastSuccessfulLoggedAction,
  getLastFailedLoggedAction,
  getEmailAction,
} from 'containers/DashboardPage/actions';

// Import Selectors
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeNameSelector,
  makeSurnameSelector,
  makeEmailSelector,
  makeLastSuccessfulLoggedSelector,
  makeLastPresentLoggedSelector,
  makeLastFailedLoggedSelector,
} from 'containers/DashboardPage/selectors';

const stateSelector = createStructuredSelector({
  name: makeNameSelector(),
  surname: makeSurnameSelector(),
  email: makeEmailSelector(),
  locale: makeSelectLocale(),
  lastPresentLogged: makeLastPresentLoggedSelector(),
  lastSuccessfulLogged: makeLastSuccessfulLoggedSelector(),
  lastFailedLogged: makeLastFailedLoggedSelector(),
});

const key = 'dashboardPage';

function isGreetingEvening(locale, hh, HH, A) {
  if (
    (locale === 'en' && (hh >= 7 && A === 'PM')) ||
    (hh <= 5 && A === 'AM') ||
    (locale !== 'en' && (HH >= 19 || HH <= 5))
  )
    return true;
  return false;
}

export default function GreetingHeader() {
  const dispatch = useDispatch();
  const getName = () => dispatch(getNameAction());
  const getSurname = () => dispatch(getSurnameAction());
  const getEmail = () => dispatch(getEmailAction());
  const getLastPresentLogged = () => dispatch(getLastPresentLoggedAction());
  const getLastSuccessfulLogged = () =>
    dispatch(getLastSuccessfulLoggedAction());
  const getLastFailedLogged = () => dispatch(getLastFailedLoggedAction());
  const {
    name,
    surname,
    email,
    locale,
    lastPresentLogged,
    lastSuccessfulLogged,
    lastFailedLogged,
  } = useSelector(stateSelector);

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  useEffect(() => {
    if (!name) getName();
    if (!surname) getSurname();
    if (!email) getEmail();
    if (!lastPresentLogged) getLastPresentLogged();
    if (!lastSuccessfulLogged) getLastSuccessfulLogged();
    if (!lastFailedLogged) getLastFailedLogged();
  }, []);

  return (
    <HeadlineWrapper
      name={name}
      surname={surname}
      lastPresentLogged={lastPresentLogged}
      lastSuccessfulLogged={lastSuccessfulLogged}
    >
      <TextWrapper>
        {isGreetingEvening(
          locale,
          format(new Date(), 'hh'),
          format(new Date(), 'HH'),
          format(new Date(), 'A'),
        ) ? (
          <FormattedMessage {...messages.greetingPm} />
        ) : (
          <FormattedMessage {...messages.greetingAm} />
        )}

        <HeadlineNameWrapper>
          {', '} {name} {surname}
        </HeadlineNameWrapper>
      </TextWrapper>
      <TextWrapper>
        <FormattedMessage {...messages.lastSuccessfulLoginInformation} />{' '}
        <time>{lastSuccessfulLogged || lastPresentLogged}</time>
      </TextWrapper>

      {lastFailedLogged && (
        <TextWrapper lastFailedLogged={lastFailedLogged}>
          <FormattedMessage {...messages.lastFailedLoginInformation} />{' '}
          <time>{lastFailedLogged}</time>
        </TextWrapper>
      )}
    </HeadlineWrapper>
  );
}
