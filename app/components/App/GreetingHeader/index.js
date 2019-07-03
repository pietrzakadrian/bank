/* eslint-disable indent */
/**
 *
 * GreetingHeader
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { format } from 'date-fns';
import {
  makeNameSelector,
  makeSurnameSelector,
  makeEmailSelector,
  makeLastSuccessfulLoggedSelector,
  makeLastPresentLoggedSelector,
  makeLastFailedLoggedSelector,
} from 'containers/DashboardPage/selectors';
import {
  getNameAction,
  getSurnameAction,
  getLastPresentLoggedAction,
  getLastSuccessfulLoggedAction,
  getLastFailedLoggedAction,
  getEmailAction,
} from 'containers/DashboardPage/actions';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

// Import Components
import HeadlineWrapper from './HeadlineWrapper';
import HeadlineNameWrapper from './HeadlineNameWrapper';
import TextWrapper from './TextWrapper';
import messages from './messages';

function GreetingHeader({
  name,
  surname,
  email,
  locale,
  lastSuccessfulLogged,
  lastPresentLogged,
  lastFailedLogged,
  getName,
  getSurname,
  getEmail,
  getLastPresentLogged,
  getLastSuccessfulLogged,
  getLastFailedLogged,
}) {
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });
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

function isGreetingEvening(locale, hh, HH, A) {
  if (
    (locale === 'en' && (hh >= 7 && A === 'PM')) ||
    (hh <= 5 && A === 'AM') ||
    (locale !== 'en' && (HH >= 19 || HH <= 5))
  )
    return true;
  return false;
}

GreetingHeader.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  locale: PropTypes.string,
  lastSuccessfulLogged: PropTypes.string,
  lastPresentLogged: PropTypes.string,
  lastFailedLogged: PropTypes.string,
  getName: PropTypes.func,
  getSurname: PropTypes.func,
  getEmail: PropTypes.func,
  getLastPresentLogged: PropTypes.func,
  getLastSuccessfulLogged: PropTypes.func,
  getLastFailedLogged: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  name: makeNameSelector(),
  surname: makeSurnameSelector(),
  email: makeEmailSelector(),
  locale: makeSelectLocale(),
  lastPresentLogged: makeLastPresentLoggedSelector(),
  lastSuccessfulLogged: makeLastSuccessfulLoggedSelector(),
  lastFailedLogged: makeLastFailedLoggedSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getName: () => dispatch(getNameAction()),
    getSurname: () => dispatch(getSurnameAction()),
    getEmail: () => dispatch(getEmailAction()),
    getLastPresentLogged: () => dispatch(getLastPresentLoggedAction()),
    getLastSuccessfulLogged: () => dispatch(getLastSuccessfulLoggedAction()),
    getLastFailedLogged: () => dispatch(getLastFailedLoggedAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GreetingHeader);
