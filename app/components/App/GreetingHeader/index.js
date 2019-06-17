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
import {
  makeNameSelector,
  makeSurnameSelector,
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
import messages from './messages';

function GreetingHeader({
  name,
  surname,
  lastSuccessfulLogged,
  lastPresentLogged,
  lastFailedLogged,
  getUserdata,
}) {
  useEffect(() => {
    if (
      !name ||
      !surname ||
      !lastSuccessfulLogged ||
      !lastPresentLogged ||
      !lastFailedLogged
    )
      getUserdata();
  }, []);

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

GreetingHeader.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  lastSuccessfulLogged: PropTypes.string,
  lastPresentLogged: PropTypes.string,
  lastFailedLogged: PropTypes.string,
  getUserdata: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  name: makeNameSelector(),
  surname: makeSurnameSelector(),
  lastSuccessfulLogged: makeLastSuccessfulLoggedSelector(),
  lastPresentLogged: makeLastPresentLoggedSelector(),
  lastFailedLogged: makeLastFailedLoggedSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserdata: () => {
      dispatch(getNameAction());
      dispatch(getSurnameAction());
      dispatch(getEmailAction());
      dispatch(getLastPresentLoggedAction());
      dispatch(getLastSuccessfulLoggedAction());
      dispatch(getLastFailedLoggedAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GreetingHeader);
