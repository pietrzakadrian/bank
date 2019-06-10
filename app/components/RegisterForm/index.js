/**
 *
 * RegisterForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Components
import FormWrapper from 'components/FormWrapper';
import LabelWrapper from 'components/LabelWrapper';
import InputWrapper from 'components/InputWrapper';
import ButtonWrapper from 'components/ButtonWrapper';
import ButtonBackWrapper from 'components/ButtonBackWrapper';
import NavigateNextIcon from 'components/NavigateNextIcon';
import NavigateBackIcon from 'components/NavigateBackIcon';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import {
  makeIsLoadingSelector,
  makeNameSelector,
  makePasswordSelector,
  makeLoginSelector,
  makeSurnameSelector,
  makeEmailSelector,
  makeErrorSelector,
  makeCurrencySelector,
  makeCurrencyIdSelector,
  makeIsDataProcessingAgreementSelector,
  makeErrorDataProcessingAgreementSelector,
  makeActiveStepSelector,
} from 'containers/RegisterPage/selectors';
import {
  stepNextAction,
  stepBackAction,
  changeLoginAction,
  changePasswordAction,
  enterLoginAction,
  enterPasswordAction,
  changeNameAction,
  enterNameAction,
  changeSurnameAction,
  changeEmailAction,
  toggleDataProcessingAgreementAction,
  loadCurrencyAction,
  enterCurrencyAction,
} from 'containers/RegisterPage/actions';
import messages from './messages';

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function RegisterForm({
  login,
  password,
  name,
  surname,
  email,
  error,
  currency,
  currencyId,
  isDataProcessingAgreement,
  errorDataProcessingAgreement,
  isLoading,
  activeStep,
  onChangeLogin,
  onEnterLogin,
  onChangePassword,
  onEnterPassword,
  onChangeName,
  onEnterName,
  onChangeSurname,
  onEnterSurname,
  onChangeEmail,
  onEnterEmail,
  toggleDataProcessingAgreement,
  onLoadCurrency,
  onEnterCurrency,
  handleKeyDown,
  handleKeyPress,
  handleStepNext,
  handleStepBack,
}) {
  const steps = getSteps();
  return (
    <FormWrapper>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <form noValidate autoComplete="off">
        {activeStep === 0 && (
          <Fragment>
            <LabelWrapper>tekst</LabelWrapper>

            <FormattedMessage {...messages.inputNumber}>
              {placeholder => (
                <InputWrapper
                  key={1}
                  placeholder={placeholder}
                  type="number"
                  value={login || ''}
                  error={error}
                  onChange={onChangeLogin}
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress}
                />
              )}
            </FormattedMessage>

            {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

            <ButtonWrapper
              type="button"
              onClick={() => onEnterLogin(login)}
              disabled={isLoading}
            >
              <FormattedMessage {...messages.nextText} />
              <NavigateNextIcon />
            </ButtonWrapper>
          </Fragment>
        )}
      </form>
    </FormWrapper>
  );
}

RegisterForm.propTypes = {
  login: PropTypes.string,
  password: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  error: PropTypes.string,
  currency: PropTypes.array,
  currencyId: PropTypes.number,
  isDataProcessingAgreement: PropTypes.bool,
  errorDataProcessingAgreement: PropTypes.string,
  isLoading: PropTypes.bool,
  activeStep: PropTypes.number,
  onChangeLogin: PropTypes.func,
  onEnterLogin: PropTypes.func,
  onChangePassword: PropTypes.func,
  onEnterPassword: PropTypes.func,
  onChangeName: PropTypes.func,
  onEnterName: PropTypes.func,
  onChangeSurname: PropTypes.func,
  onEnterSurname: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onEnterEmail: PropTypes.func,
  toggleDataProcessingAgreement: PropTypes.func,
  onLoadCurrency: PropTypes.func,
  onEnterCurrency: PropTypes.func,
  handleStepNext: PropTypes.func,
  handleStepBack: PropTypes.func,
  handleKeyPress: PropTypes.func,
  handleKeyDown: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeLoginSelector(),
  password: makePasswordSelector(),
  name: makeNameSelector(),
  surname: makeSurnameSelector(),
  email: makeEmailSelector(),
  error: makeErrorSelector(),
  currency: makeCurrencySelector(),
  currencyId: makeCurrencyIdSelector(),
  isDataProcessingAgreement: makeIsDataProcessingAgreementSelector(),
  errorDataProcessingAgreement: makeErrorDataProcessingAgreementSelector(),
  isLoading: makeIsLoadingSelector(),
  activeStep: makeActiveStepSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeLogin: e => dispatch(changeLoginAction(e.target.value)),
    onEnterLogin: login => dispatch(enterLoginAction(login)),
    onChangePassword: e => dispatch(changePasswordAction(e.target.value)),
    onEnterPassword: password => dispatch(enterPasswordAction(password)),
    onChangeName: e => dispatch(changeNameAction(e.target.value)),
    onEnterName: name => dispatch(enterNameAction(name)),
    onChangeSurname: e => dispatch(changeSurnameAction(e.target.value)),
    onEnterSurname: surname => dispatch(changeSurnameAction(surname)),
    onChangeEmail: e => dispatch(changeEmailAction(e.target.value)),
    onEnterEmail: email => dispatch(changeEmailAction(email)),
    toggleDataProcessingAgreement: () =>
      dispatch(toggleDataProcessingAgreementAction()),
    onLoadCurrency: () => dispatch(loadCurrencyAction()),
    onEnterCurrency: currencyId => dispatch(enterCurrencyAction(currencyId)),
    handleStepNext: () => dispatch(stepNextAction()),
    handleStepBack: () => dispatch(stepBackAction()),
    handleKeyPress: e => e.key === 'e' && e.preventDefault(),
    handleKeyDown: e => e.key === 'Enter' && e.preventDefault(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterForm);
