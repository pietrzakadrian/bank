/**
 *
 * RegisterForm
 *
 */

import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

// Import Components
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormWrapper from 'components/FormWrapper';
import LabelWrapper from 'components/LabelWrapper';
import InputWrapper from 'components/InputWrapper';
import StepperWrapper from 'components/StepperWrapper';
import ButtonWrapper from 'components/ButtonWrapper';
import ButtonBackWrapper from 'components/ButtonBackWrapper';
import NavigateNextIcon from 'components/NavigateNextIcon';
import NavigateBackIcon from 'components/NavigateBackIcon';
import StepperDesktop from 'components/StepperDesktop';
import StepperMobile from 'components/StepperMobile';
import CurrencyToggle from 'components/CurrencyToggle';
import InformationWrapper from './InformationWrapper';
import CheckboxWrapper from './CheckboxWrapper';
import TextWrapper from './TextWrapper';
import messages from './messages';

// Import Actions
import {
  stepBackAction,
  changeLoginAction,
  changePasswordAction,
  enterLoginAction,
  enterPasswordAction,
  changeNameAction,
  enterNameAction,
  changeSurnameAction,
  enterSurnameAction,
  changeEmailAction,
  enterEmailAction,
  toggleDataProcessingAgreementAction,
  enterCurrencyAction,
} from 'containers/RegisterPage/actions';

// Import Selectors
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

const stateSelector = createStructuredSelector({
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

function getSteps() {
  return [
    <FormattedMessage {...messages.idNumber} />,
    <FormattedMessage {...messages.password} />,
    <FormattedMessage {...messages.name} />,
    <FormattedMessage {...messages.surname} />,
    <FormattedMessage {...messages.currency} />,
    <FormattedMessage {...messages.emailAddress} />,
  ];
}

export default function RegisterForm() {
  const dispatch = useDispatch();
  const onChangeLogin = e =>
    dispatch(changeLoginAction(parseInt(e.target.value, 10)));
  const onEnterLogin = login => dispatch(enterLoginAction(parseInt(login, 10)));
  const onChangePassword = e => dispatch(changePasswordAction(e.target.value));
  const onEnterPassword = password => dispatch(enterPasswordAction(password));
  const onChangeName = e => dispatch(changeNameAction(e.target.value));
  const onEnterName = name => dispatch(enterNameAction(name));
  const onChangeSurname = e => dispatch(changeSurnameAction(e.target.value));
  const onEnterSurname = surname => dispatch(enterSurnameAction(surname));
  const onChangeEmail = e => dispatch(changeEmailAction(e.target.value));
  const onEnterEmail = email => dispatch(enterEmailAction(email));
  const onToggleDataProcessingAgreement = () =>
    dispatch(toggleDataProcessingAgreementAction());
  const onEnterCurrency = currencyId =>
    dispatch(enterCurrencyAction(currencyId));
  const handleStepBack = () => dispatch(stepBackAction());
  const handleKeyPress = e =>
    (e.key === 'E' || e.key === 'e') && e.preventDefault();
  const {
    login,
    password,
    name,
    surname,
    email,
    error,
    currencyId,
    isDataProcessingAgreement,
    errorDataProcessingAgreement,
    isLoading,
    activeStep,
  } = useSelector(stateSelector);
  const steps = getSteps();

  return (
    <Fragment>
      <StepperWrapper>
        <StepperDesktop activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </StepperDesktop>

        <StepperMobile
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
        />
      </StepperWrapper>

      <FormWrapper>
        <form noValidate autoComplete="off">
          {activeStep === 0 && (
            <Fragment>
              <LabelWrapper>
                <FormattedMessage {...messages.idNumber} />
              </LabelWrapper>

              <FormattedMessage {...messages.inputNumber}>
                {placeholder => (
                  <InputWrapper
                    key={1}
                    placeholder={placeholder}
                    type="number"
                    max="20"
                    value={login || ''}
                    error={error}
                    onChange={onChangeLogin}
                    onKeyDown={e =>
                      e.keyCode === 13 &&
                      onEnterLogin(login) &&
                      e.preventDefault()
                    }
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

          {activeStep === 1 && (
            <Fragment>
              <LabelWrapper>
                <FormattedMessage {...messages.password} />
              </LabelWrapper>

              <FormattedMessage {...messages.inputPassword}>
                {placeholder => (
                  <InputWrapper
                    key={2}
                    placeholder={placeholder}
                    type="password"
                    value={password || ''}
                    error={error}
                    onChange={onChangePassword}
                    onKeyDown={e =>
                      e.keyCode === 13 &&
                      onEnterPassword(password) &&
                      e.preventDefault()
                    }
                  />
                )}
              </FormattedMessage>

              {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

              <ButtonWrapper
                type="button"
                onClick={() => onEnterPassword(password)}
                disabled={isLoading}
              >
                <FormattedMessage {...messages.nextText} />
                <NavigateNextIcon />
              </ButtonWrapper>
            </Fragment>
          )}

          {activeStep === 2 && (
            <Fragment>
              <LabelWrapper>
                <FormattedMessage {...messages.name} />
              </LabelWrapper>

              <FormattedMessage {...messages.inputName}>
                {placeholder => (
                  <InputWrapper
                    key={3}
                    placeholder={placeholder}
                    type="text"
                    value={name || ''}
                    error={error}
                    onChange={onChangeName}
                    onKeyDown={e =>
                      e.keyCode === 13 &&
                      onEnterName(name) &&
                      e.preventDefault()
                    }
                  />
                )}
              </FormattedMessage>

              {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

              <ButtonWrapper
                type="button"
                onClick={() => onEnterName(name)}
                disabled={isLoading}
              >
                <FormattedMessage {...messages.nextText} />
                <NavigateNextIcon />
              </ButtonWrapper>
            </Fragment>
          )}

          {activeStep === 3 && (
            <Fragment>
              <LabelWrapper>
                <FormattedMessage {...messages.surname} />
              </LabelWrapper>

              <FormattedMessage {...messages.inputSurname}>
                {placeholder => (
                  <InputWrapper
                    key={4}
                    placeholder={placeholder}
                    type="text"
                    value={surname || ''}
                    error={error}
                    onChange={onChangeSurname}
                    onKeyDown={e =>
                      e.keyCode === 13 &&
                      onEnterSurname(surname) &&
                      e.preventDefault()
                    }
                  />
                )}
              </FormattedMessage>

              {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

              <ButtonWrapper
                type="button"
                onClick={() => onEnterSurname(surname)}
                disabled={isLoading}
              >
                <FormattedMessage {...messages.nextText} />
                <NavigateNextIcon />
              </ButtonWrapper>
            </Fragment>
          )}

          {activeStep === 4 && (
            <Fragment>
              <LabelWrapper>
                <FormattedMessage {...messages.currency} />
              </LabelWrapper>
              <CurrencyToggle />

              {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

              <ButtonWrapper
                type="button"
                onClick={() => onEnterCurrency(currencyId)}
                disabled={isLoading}
              >
                <FormattedMessage {...messages.nextText} />
                <NavigateNextIcon />
              </ButtonWrapper>
            </Fragment>
          )}

          {activeStep === 5 && (
            <Fragment>
              <LabelWrapper>
                <FormattedMessage {...messages.emailAddress} />
              </LabelWrapper>

              <FormattedMessage {...messages.inputEmail}>
                {placeholder => (
                  <InputWrapper
                    key={5}
                    placeholder={placeholder}
                    type="text"
                    value={email || ''}
                    error={error}
                    onChange={onChangeEmail}
                    onKeyDown={e =>
                      e.keyCode === 13 &&
                      onEnterEmail(email) &&
                      e.preventDefault()
                    }
                  />
                )}
              </FormattedMessage>

              {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

              <CheckboxWrapper>
                <Checkbox
                  checked={isDataProcessingAgreement}
                  onClick={onToggleDataProcessingAgreement}
                  color="primary"
                />

                <TextWrapper>
                  <FormattedMessage {...messages.checkboxRodo} />
                </TextWrapper>
              </CheckboxWrapper>

              {errorDataProcessingAgreement && (
                <LabelWrapper error={errorDataProcessingAgreement}>
                  {errorDataProcessingAgreement}
                </LabelWrapper>
              )}

              <InformationWrapper>
                <FormattedMessage {...messages.textEmailNeed} />
              </InformationWrapper>

              <ButtonWrapper
                type="button"
                onClick={() => onEnterEmail(email)}
                disabled={isLoading}
              >
                <FormattedMessage {...messages.createAnAccount} />
              </ButtonWrapper>
            </Fragment>
          )}

          {activeStep !== 0 && steps.length - 1 && (
            <ButtonBackWrapper
              type="button"
              onClick={handleStepBack}
              disabled={isLoading}
            >
              <NavigateBackIcon />
              <FormattedMessage {...messages.backText} />
            </ButtonBackWrapper>
          )}
        </form>
      </FormWrapper>
    </Fragment>
  );
}
