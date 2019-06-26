/**
 *
 * PaymentForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import StepperWrapper from 'components/StepperWrapper';
import StepperDesktop from 'components/StepperDesktop';
import StepperMobile from 'components/StepperMobile';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { FormattedMessage } from 'react-intl';
import {
  makeActiveStepSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makeSuggestionsSelector,
} from 'containers/PaymentPage/selectors';
import ButtonBackWrapper from 'components/ButtonBackWrapper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import LabelWrapper from 'components/LabelWrapper';
import NavigateNextIcon from 'components/NavigateNextIcon';
import NavigateBackIcon from 'components/NavigateBackIcon';
import InputWrapper from 'components/InputWrapper';
import FormWrapper from 'components/FormWrapper';
import ButtonWrapper from 'components/ButtonWrapper';
import { stepBackAction } from 'containers/PaymentPage/actions';
import messages from './messages';

function PaymentForm({ activeStep, isLoading, error, handleStepBack }) {
  const steps = getSteps();

  return (
    <FormWrapper background="white">
      <StepperWrapper>
        <StepperDesktop background="white" activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </StepperDesktop>

        <StepperMobile
          background="white"
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
        />
      </StepperWrapper>

      <form noValidate autoComplete="off">
        {activeStep === 0 && (
          <Fragment>
            <LabelWrapper large>
              <FormattedMessage {...messages.stepAccountNumber} />
            </LabelWrapper>

            {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

            <ButtonWrapper large type="button" disabled={isLoading}>
              <FormattedMessage {...messages.nextText} />
              <NavigateNextIcon />
            </ButtonWrapper>
          </Fragment>
        )}

        {activeStep === 1 && (
          <Fragment>
            <LabelWrapper large>
              <FormattedMessage {...messages.stepAmountOfMoney} />
            </LabelWrapper>

            <FormattedMessage {...messages.inputAmountOfMoney}>
              {placeholder => (
                <InputWrapper
                  large
                  key={1}
                  placeholder={placeholder}
                  type="number"
                  error={error}
                />
              )}
            </FormattedMessage>

            {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

            <ButtonWrapper large type="button" disabled={isLoading}>
              <FormattedMessage {...messages.nextText} />
              <NavigateNextIcon />
            </ButtonWrapper>
          </Fragment>
        )}

        {activeStep === 2 && (
          <Fragment>
            <LabelWrapper large>
              <FormattedMessage {...messages.stepTransferTitle} />
            </LabelWrapper>

            <FormattedMessage {...messages.inputTransferTitle}>
              {placeholder => (
                <InputWrapper
                  large
                  key={1}
                  placeholder={placeholder}
                  type="number"
                  error={error}
                />
              )}
            </FormattedMessage>

            {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

            <ButtonWrapper large type="button" disabled={isLoading}>
              <FormattedMessage {...messages.nextText} />
              <NavigateNextIcon />
            </ButtonWrapper>
          </Fragment>
        )}

        {activeStep !== 0 && steps.length - 1 && (
          <ButtonBackWrapper
            large
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
  );
}

function getSteps() {
  return [
    <FormattedMessage key={1} {...messages.stepAccountNumber} />,
    <FormattedMessage key={2} {...messages.stepAmountOfMoney} />,
    <FormattedMessage key={3} {...messages.stepTransferTitle} />,
    <FormattedMessage key={4} {...messages.stepConfirmTheData} />,
  ];
}

PaymentForm.propTypes = {
  activeStep: PropTypes.number,
  isLoading: PropTypes.bool,
  suggestions: PropTypes.array,
  handleStepBack: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  activeStep: makeActiveStepSelector(),
  isLoading: makeIsLoadingSelector(),
  error: makeErrorSelector(),
  suggestions: makeSuggestionsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleStepBack: () => dispatch(stepBackAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PaymentForm);
