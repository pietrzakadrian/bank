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
  makeAccountNumberSelector,
  makeActiveStepSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makeSuggestionsSelector,
  makeAmountMoneySelector,
  makeTransferTitleSelector,
  makeIsSendAuthorizationKeySelector,
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
  changeAccountNumberAction,
  changeAmountMoneyAction,
  changeTransferTitleAction,
  enterAmountMoneyAction,
  enterTransferTitleAction,
  searchAccountBillsAction,
  clearAccountBillsAction,
  enterAccountNumberAction,
  sendAuthorizationKeyAction,
} from 'containers/PaymentPage/actions';
import Autosuggest from 'react-autosuggest';
import AutosuggestWrapper from './AutosuggestWrapper';
import messages from './messages';
import AutosuggestSuggestionsListWrapper from './AutosuggestSuggestionsListWrapper';
import ContainerWrapper from '../ContainerWrapper';

function PaymentForm({
  accountNumber,
  amountMoney,
  transferTitle,
  activeStep,
  suggestions,
  isSendAuthorizationKey,
  isLoading,
  error,
  onChangeAccountNumber,
  onEnterAccountNumber,
  onChangeAmountMoney,
  onEnterAmountMoney,
  onChangeTransferTitle,
  onEnterTransferTitle,
  onSendAuthorizationKey,
  handleStepBack,
  handleKeyDown,
  handleKeyPress,
  handleSuggestionsFetchRequested,
  handleSuggestionsClearRequested,
}) {
  const steps = getSteps();
  const inputProps = {
    value: accountNumber,
    onChange: onChangeAccountNumber,
    maxLength: 26,
    onKeyPress: handleKeyPress,
    onKeyDown: handleKeyDown,
    type: 'number',
  };

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

            <AutosuggestWrapper error={error}>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={handleSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
            </AutosuggestWrapper>

            {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

            <ButtonWrapper
              large
              type="button"
              disabled={isLoading}
              onClick={() => onEnterAccountNumber(accountNumber)}
            >
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
                  onKeyDown={handleKeyDown}
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
                  onKeyPress={handleKeyPress}
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

        {activeStep === 3 && (
          <ContainerWrapper>
            <FormWrapper>
              <div>
                <LabelWrapper large>
                  <FormattedMessage {...messages.stepAccountNumber} />
                </LabelWrapper>

                <InputWrapper large key={1} value={accountNumber} readonly />
              </div>

              <div>
                <LabelWrapper large>
                  <FormattedMessage {...messages.stepAmountOfMoney} />
                </LabelWrapper>

                <InputWrapper large key={2} value={amountMoney} readonly />
              </div>

              <div>
                <LabelWrapper large>
                  <FormattedMessage {...messages.stepTransferTitle} />
                </LabelWrapper>

                <InputWrapper large key={3} value={transferTitle} readonly />
              </div>

              <ButtonWrapper
                large
                type="button"
                disabled={isLoading || isSendAuthorizationKey}
                onClick={onSendAuthorizationKey}
              >
                <FormattedMessage {...messages.inputReceiveCode} />
                <NavigateNextIcon />
              </ButtonWrapper>

              {isSendAuthorizationKey && (
                <div>
                  <InputWrapper key={4} />

                  <ButtonWrapper type="button" disabled={isLoading}>
                    <FormattedMessage {...messages.inputMakePayment} />
                    <NavigateNextIcon />
                  </ButtonWrapper>
                </div>
              )}
            </FormWrapper>
          </ContainerWrapper>
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

function getSuggestionValue(suggestion) {
  return suggestion.account_bill;
}

function renderSuggestion(suggestion) {
  return (
    <div>
      <div>
        {suggestion.account_bill
          .toString()
          .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
          .trim()}
      </div>
      <AutosuggestSuggestionsListWrapper>
        {suggestion.user.name} {suggestion.user.surname}
      </AutosuggestSuggestionsListWrapper>
    </div>
  );
}

PaymentForm.propTypes = {
  transferTitle: PropTypes.string,
  activeStep: PropTypes.number,
  isLoading: PropTypes.bool,
  isSendAuthorizationKey: PropTypes.bool,
  handleStepBack: PropTypes.func,
  handleKeyDown: PropTypes.func,
  handleKeyPress: PropTypes.func,
  handleSuggestionsFetchRequested: PropTypes.func,
  handleSuggestionsClearRequested: PropTypes.func,
  onChangeAccountNumber: PropTypes.func,
  onEnterAccountNumber: PropTypes.func,
  onChangeAmountMoney: PropTypes.func,
  onEnterAmountMoney: PropTypes.func,
  onChangeTransferTitle: PropTypes.func,
  onEnterTransferTitle: PropTypes.func,
  onSendAuthorizationKey: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  accountNumber: makeAccountNumberSelector(),
  amountMoney: makeAmountMoneySelector(),
  transferTitle: makeTransferTitleSelector(),
  activeStep: makeActiveStepSelector(),
  isSendAuthorizationKey: makeIsSendAuthorizationKeySelector(),
  isLoading: makeIsLoadingSelector(),
  error: makeErrorSelector(),
  suggestions: makeSuggestionsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeAccountNumber: (e, { newValue }) =>
      dispatch(changeAccountNumberAction(newValue)),
    onChangeAmountMoney: e => dispatch(changeAmountMoneyAction(e.target.value)),
    onEnterAccountNumber: accountNumber =>
      dispatch(enterAccountNumberAction(accountNumber)),
    onEnterAmountMoney: amountMoney =>
      dispatch(enterAmountMoneyAction(amountMoney)),
    onChangeTransferTitle: e =>
      dispatch(changeTransferTitleAction(e.target.value)),
    onEnterTransferTitle: transferTitle =>
      dispatch(enterTransferTitleAction(transferTitle)),
    onSendAuthorizationKey: () => dispatch(sendAuthorizationKeyAction()),
    handleSuggestionsFetchRequested: value =>
      dispatch(searchAccountBillsAction(value)),
    handleSuggestionsClearRequested: () => dispatch(clearAccountBillsAction()),
    handleStepBack: () => dispatch(stepBackAction()),
    handleKeyPress: e => (e.key === 'E' || e.key === 'e') && e.preventDefault(),
    handleKeyDown: e => e.keyCode === 13 && e.preventDefault(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PaymentForm);
