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
import ContainerWrapper from './ContainerWrapper';
import FormWrapper from './FormWrapper';
import messages from './messages';
import SelectWrapper from '../SelectWrapper';
function SettingsForm({
  name,
  newName,
  surname,
  email,
  isLoading,
  onLoadUserData,
  onLoadCurrency,
  handleKeyPress,
  onChangeName,
  onChangeSurname,
  onChangePassword,
  onChangeEmail,
}) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  useEffect(() => {
    onLoadUserData();
    onLoadCurrency();
  }, []);

  return (
    <ContainerWrapper>
      <FormWrapper noValidate autoComplete="off">
        <div>
          <LabelWrapper>
            <FormattedMessage {...messages.changeName} />
          </LabelWrapper>

          <InputWrapper
            key={1}
            value={name || newName}
            type="text"
            onChange={onChangeName}
            onKeyPress={handleKeyPress}
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

        <ButtonWrapper type="button" disabled={isLoading}>
          <FormattedMessage {...messages.saveData} />
        </ButtonWrapper>
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
          </SelectWrapper>
        </div>
      </FormWrapper>
    </ContainerWrapper>
  );
}

SettingsForm.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  isLoading: PropTypes.bool,
  onLoadUserData: PropTypes.func,
  onLoadCurrency: PropTypes.func,
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
    onLoadCurrency: () => dispatch(loadCurrencyAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SettingsForm);
