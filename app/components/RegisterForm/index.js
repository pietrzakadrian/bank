/**
 *
 * RegisterForm
 *
 */

import React from 'react';
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
} from 'containers/RegisterPage/actions';
import messages from './messages';

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
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

      {activeStep === 0 && getStepContent(activeStep)}

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
  handleStepNext: PropTypes.func,
  handleStepBack: PropTypes.func,
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
    handleStepNext: () => dispatch(stepNextAction()),
    handleStepBack: () => dispatch(stepBackAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterForm);
