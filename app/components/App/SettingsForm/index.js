/**
 *
 * SettingsForm
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
import saga from 'containers/SettingsPage/saga';
import reducer from 'containers/SettingsPage/reducer';
import LabelWrapper from 'components/LabelWrapper';
import InputWrapper from 'components/InputWrapper';
import ButtonWrapper from 'components/ButtonWrapper';
import CurrencyToggle from 'components/App/CurrencyToggle';
import CurrencyAlert from 'components/App/CurrencyAlert';
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
  makeCurrencyMessageSelector,
  makeIsOpenAlertSelector,
  makeErrorSelector,
  makeIsLoadingSelector,
} from 'containers/SettingsPage/selectors';
import {
  changeNewNameAction,
  changeNewSurnameAction,
  changeNewPasswordAction,
  changeNewEmailAction,
  saveDataAction,
  loadUserDataAction,
  loadCurrencyAction,
} from 'containers/SettingsPage/actions';
import LocaleToggle from 'components/LocaleToggle';
import { makeIsOpenNavigationDesktopSelector } from 'containers/App/selectors';
import TextWrapper from 'components/App/TextWrapper';
import ContainerWrapper from './ContainerWrapper';
import FormWrapper from './FormWrapper';
import messages from './messages';
import SelectWrapper from '../SelectWrapper';
function SettingsForm({
  name,
  newName,
  errorName,
  surname,
  newSurname,
  errorSurname,
  email,
  newEmail,
  errorEmail,
  errorPassword,
  error,
  message,
  currencyMessage,
  isLoading,
  isOpenNavigationDesktop,
  onLoadUserData,
  onLoadCurrency,
  onChangeName,
  onChangeSurname,
  onChangePassword,
  onChangeEmail,
  onSaveData,
}) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  useEffect(() => {
    onLoadUserData();
    onLoadCurrency();
  }, []);

  return (
    <ContainerWrapper open={isOpenNavigationDesktop}>
      <FormWrapper>
        <form noValidate autoComplete="off" onSubmit={onSaveData}>
          <div>
            <LabelWrapper>
              <FormattedMessage {...messages.changeName} />
            </LabelWrapper>

            <InputWrapper
              key={1}
              value={name || newName}
              type="text"
              error={errorName}
              onChange={onChangeName}
            />

            {errorName && (
              <LabelWrapper error={errorName}>{errorName}</LabelWrapper>
            )}
          </div>

          <div>
            <LabelWrapper>
              <FormattedMessage {...messages.changeSurname} />
            </LabelWrapper>

            <InputWrapper
              key={2}
              value={surname || newSurname}
              type="text"
              error={errorSurname}
              onChange={onChangeSurname}
            />

            {errorSurname && (
              <LabelWrapper error={errorSurname}>{errorSurname}</LabelWrapper>
            )}
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
                  error={errorPassword}
                  onChange={onChangePassword}
                />
              )}
            </FormattedMessage>

            {errorPassword && (
              <LabelWrapper error={errorPassword}>{errorPassword}</LabelWrapper>
            )}
          </div>

          <div>
            <LabelWrapper>
              <FormattedMessage {...messages.changeEmail} />
            </LabelWrapper>

            <InputWrapper
              key={4}
              value={email || newEmail}
              type="email"
              error={errorEmail}
              onChange={onChangeEmail}
            />

            {errorEmail && (
              <LabelWrapper error={errorEmail}>{errorEmail}</LabelWrapper>
            )}
          </div>

          <ButtonWrapper type="submit" disabled={isLoading}>
            <FormattedMessage {...messages.saveData} />
          </ButtonWrapper>

          {(message || error) && (
            <TextWrapper error={error}>{message || error}</TextWrapper>
          )}
        </form>
      </FormWrapper>

      <FormWrapper>
        <div>
          <LabelWrapper>
            <FormattedMessage {...messages.changeLang} />
          </LabelWrapper>
          <SelectWrapper>
            <LocaleToggle />
          </SelectWrapper>
        </div>

        <div>
          <LabelWrapper>
            <FormattedMessage {...messages.changeCurrency} />
          </LabelWrapper>

          <SelectWrapper>
            <CurrencyToggle />
            <CurrencyAlert />
          </SelectWrapper>

          {currencyMessage && <TextWrapper>{currencyMessage}</TextWrapper>}
        </div>
      </FormWrapper>
    </ContainerWrapper>
  );
}

SettingsForm.propTypes = {
  name: PropTypes.string,
  newName: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  newEmail: PropTypes.string,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  isOpenNavigationDesktop: PropTypes.bool,
  onLoadUserData: PropTypes.func,
  onLoadCurrency: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeSurname: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onSaveData: PropTypes.func,
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
  error: makeErrorSelector(),
  message: makeMessageSelector(),
  currency: makeCurrencySelector(),
  currencyId: makeCurrencyIdSelector(),
  currencyMessage: makeCurrencyMessageSelector(),
  isOpenAlert: makeIsOpenAlertSelector(),
  isLoading: makeIsLoadingSelector(),
  isOpenNavigationDesktop: makeIsOpenNavigationDesktopSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeName: e => dispatch(changeNewNameAction(e.target.value)),
    onChangeSurname: e => dispatch(changeNewSurnameAction(e.target.value)),
    onChangePassword: e => dispatch(changeNewPasswordAction(e.target.value)),
    onChangeEmail: e => dispatch(changeNewEmailAction(e.target.value)),
    onSaveData: e => dispatch(saveDataAction()) && e.preventDefault(),
    onLoadUserData: () => dispatch(loadUserDataAction()),
    onLoadCurrency: () => dispatch(loadCurrencyAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SettingsForm);
