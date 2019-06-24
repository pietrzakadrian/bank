/**
 *
 * SettingsForm
 *
 */

import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/SettingsPage/saga';
import reducer from 'containers/SettingsPage/reducer';
import LabelWrapper from 'components/LabelWrapper';
import InputWrapper from 'components/InputWrapper';
import ButtonWrapper from 'components/ButtonWrapper';
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
} from 'containers/SettingsPage/selectors';
import {
  changeNewNameAction,
  changeNewSurnameAction,
  changeNewPasswordAction,
  changeNewEmailAction,
  saveDataAction,
  loadUserDataAction,
} from 'containers/SettingsPage/actions';

import messages from './messages';

function SettingsForm({
  name,
  newName,
  surname,
  email,
  onLoadUserData,
  onChangeName,
  onChangeSurname,
  onChangePassword,
  onChangeEmail,
}) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  useEffect(() => {
    onLoadUserData();
  }, []);

  return (
    <Fragment>
      <div>
        <LabelWrapper>
          <FormattedMessage {...messages.changeName} />
        </LabelWrapper>

        <InputWrapper
          key={1}
          value={name || newName}
          type="text"
          onChange={onChangeName}
        />
      </div>

      <div>
        <LabelWrapper>
          <FormattedMessage {...messages.changeSurname} />
        </LabelWrapper>

        <InputWrapper
          key={2}
          value={surname}
          type="text"
          onChange={onChangeSurname}
        />
      </div>

      <div>
        <LabelWrapper>
          <FormattedMessage {...messages.changePassword} />
        </LabelWrapper>
        <FormattedMessage {...messages.inputNewPassword}>
          {placeholder => (
            <InputWrapper
              key={3}
              placeholder={placeholder}
              type="password"
              onChange={onChangePassword}
            />
          )}
        </FormattedMessage>
      </div>

      <div>
        <LabelWrapper>
          <FormattedMessage {...messages.changeEmail} />
        </LabelWrapper>

        <InputWrapper
          key={4}
          value={email}
          type="email"
          onChange={onChangeEmail}
        />
      </div>

      <ButtonWrapper type="button">
        <FormattedMessage {...messages.saveData} />
      </ButtonWrapper>
    </Fragment>
  );
}

SettingsForm.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  onLoadUserData: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeSurname: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeEmail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  name: makeNameSelector(),
  surname: makeSurnameSelector(),
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

export default compose(withConnect)(SettingsForm);
