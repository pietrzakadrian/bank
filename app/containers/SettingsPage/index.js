/**
 *
 * SettingsPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeNameSelector,
  makeSurnameSelector,
  makeEmailSelector,
  makeNewPasswordSelector,
  makeNewNameSelector,
  makeNewSurnameSelector,
  makeNewEmailSelector,
  makeErrorPasswordSelector,
  makeErrorNameSelector,
  makeErrorSurnameSelector,
  makeErrorEmailSelector,
  makeMessageSelector,
  makeCurrencySelector,
  makeCurrencyIdSelector,
  makeUserCurrencyIdSelector,
  makeCurrencyMessageSelector,
  makeIsOpenAlertSelector,
  makeIsLoadingSelector,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  changeNewNameAction,
  changeNewSurnameAction,
  changeNewPasswordAction,
  changeNewEmailAction,
  saveDataAction,
  loadUserDataAction,
} from './actions';

export function SettingsPage({ onLoadUserData }) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  useEffect(() => {
    onLoadUserData();
  }, []);

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SettingsPage.propTypes = {
  onLoadUserData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  name: makeNameSelector(),
  surmame: makeSurnameSelector(),
  email: makeEmailSelector(),
  newPassword: makeNewPasswordSelector(),
  newName: makeNewNameSelector(),
  newSurname: makeNewSurnameSelector(),
  newEmail: makeNewEmailSelector(),
  errorPassword: makeErrorPasswordSelector(),
  errorName: makeErrorNameSelector(),
  errorSurname: makeErrorSurnameSelector(),
  errorEmail: makeErrorEmailSelector(),
  message: makeMessageSelector(),
  currency: makeCurrencySelector(),
  currencyId: makeCurrencyIdSelector(),
  userCurrencyId: makeUserCurrencyIdSelector(),
  currencyMessage: makeCurrencyMessageSelector(),
  isOpenAlert: makeIsOpenAlertSelector(),
  isLoading: makeIsLoadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeName: e => dispatch(changeNewNameAction(e.target.value)),
    onChangeSurname: e => dispatch(changeNewSurnameAction(e.target.value)),
    onChangePassword: e => dispatch(changeNewPasswordAction(e.target.value)),
    onChangeEmail: e => dispatch(changeNewEmailAction(e.target.value)),
    onSaveData: () => dispatch(saveDataAction()),
    onLoadUserData: () => dispatch(loadUserDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SettingsPage);
