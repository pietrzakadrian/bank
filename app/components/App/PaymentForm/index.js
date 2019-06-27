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
  makeAmountMoneySelector,
  makeTransferTitleSelector,
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
import {
  stepBackAction,
  changeAmountMoneyAction,
  changeTransferTitleAction,
  enterAmountMoneyAction,
  enterTransferTitleAction,
} from 'containers/PaymentPage/actions';
import messages from './messages';

function PaymentForm({
  amountMoney,
  transferTitle,
  activeStep,
  isLoading,
  error,
  onChangeAmountMoney,
  onEnterAmountMoney,
  onChangeTransferTitle,
  onEnterTransferTitle,
  handleStepBack,
  handleKeyPress,
}) {
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
                  onChange={onChangeAmountMoney}
                  onKeyPress={handleKeyPress}
                  placeholder={placeholder}
                  type="number"
                  error={error}
                />
              )}
            </FormattedMessage>

            {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

            <ButtonWrapper
              large
              type="button"
              disabled={isLoading}
              onClick={() => onEnterAmountMoney(amountMoney)}
            >
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
                  onChange={onChangeTransferTitle}
                  placeholder={placeholder}
                  type="text"
                  error={error}
                />
              )}
            </FormattedMessage>

            {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

            <ButtonWrapper
              large
              type="button"
              disabled={isLoading}
              onClick={() => onEnterTransferTitle(transferTitle)}
            >
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
  transferTitle: PropTypes.string,
  activeStep: PropTypes.number,
  isLoading: PropTypes.bool,
  suggestions: PropTypes.array,
  handleStepBack: PropTypes.func,
  handleKeyPress: PropTypes.func,
  onChangeAmountMoney: PropTypes.func,
  onEnterAmountMoney: PropTypes.func,
  onChangeTransferTitle: PropTypes.func,
  onEnterTransferTitle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  amountMoney: makeAmountMoneySelector(),
  transferTitle: makeTransferTitleSelector(),
  activeStep: makeActiveStepSelector(),
  isLoading: makeIsLoadingSelector(),
  error: makeErrorSelector(),
  suggestions: makeSuggestionsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeAmountMoney: e => dispatch(changeAmountMoneyAction(e.target.value)),
    onEnterAmountMoney: amountMoney =>
      dispatch(enterAmountMoneyAction(amountMoney)),
    onChangeTransferTitle: e =>
      dispatch(changeTransferTitleAction(e.target.value)),
    onEnterTransferTitle: transferTitle =>
      dispatch(enterTransferTitleAction(transferTitle)),
    handleStepBack: () => dispatch(stepBackAction()),
    handleKeyPress: e => (e.key === 'E' || e.key === 'e') && e.preventDefault(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PaymentForm);
