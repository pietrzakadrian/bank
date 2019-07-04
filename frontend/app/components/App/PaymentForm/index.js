/**
 *
 * PaymentForm
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import StepperWrapper from 'components/StepperWrapper';
import StepperDesktop from 'components/StepperDesktop';
import StepperMobile from 'components/StepperMobile';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  makeAccountNumberSelector,
  makeActiveStepSelector,
  makeIsLoadingSelector,
  makeErrorSelector,
  makeSuggestionsSelector,
  makeAmountMoneySelector,
  makeTransferTitleSelector,
  makeIsSendAuthorizationKeySelector,
  makeCurrencySelector,
  makeMessageSelector,
  makeAuthorizationKeySelector,
  makeSuggestionAuthorizationKeySelector,
} from 'containers/PaymentPage/selectors';
import ButtonBackWrapper from 'components/ButtonBackWrapper';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import LabelWrapper from 'components/LabelWrapper';
import NavigateNextIcon from 'components/NavigateNextIcon';
import NavigateBackIcon from 'components/NavigateBackIcon';
import InputWrapper from 'components/InputWrapper';
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
  getCurrencyAction,
  getAuthorizationKeyAction,
  changeAuthorizationKeyAction,
  enterAuthorizationKeyAction,
} from 'containers/PaymentPage/actions';
import Autosuggest from 'react-autosuggest';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/PaymentPage/reducer';
import saga from 'containers/PaymentPage/saga';
import TextWrapper from 'components/App/TextWrapper';
import FormWrapper from './FormWrapper';
import AutosuggestWrapper from './AutosuggestWrapper';
import messages from './messages';
import AutosuggestSuggestionsListWrapper from './AutosuggestSuggestionsListWrapper';
import AutosuggestSuggestionsAccountNumberWrapper from './AutosuggestSuggestionsAccountNumberWrapper';
import ContainerWrapper from './ContainerWrapper';
import ConfirmPaymentWrapper from './ConfirmPaymentWrapper';
import FlatButtonWrapper from './FlatButtonWrapper';
import SuggestionAuthorizationKeyWrapper from './SuggestionAuthorizationKeyWrapper';

function PaymentForm({
  accountNumber,
  amountMoney,
  transferTitle,
  currency,
  authorizationKey,
  suggestionAuthorizationKey,
  activeStep,
  suggestions,
  isSendAuthorizationKey,
  isLoading,
  message,
  error,
  intl,
  onChangeAccountNumber,
  onEnterAccountNumber,
  onChangeAmountMoney,
  onEnterAmountMoney,
  onChangeTransferTitle,
  onEnterTransferTitle,
  onChangeAuthorizationKey,
  onSendAuthorizationKey,
  onEnterAuthorizationKey,
  handleStepBack,
  handleKeyDown,
  handleKeyPress,
  handleSuggestionsFetchRequested,
  handleSuggestionsClearRequested,
  handleCurrency,
  handleAuthorizationKey,
}) {
  useInjectSaga({ key: 'paymentPage', saga });
  useInjectReducer({ key: 'paymentPage', reducer });
  useEffect(() => {
    if (!currency) handleCurrency();
  }, []);

  const steps = getSteps();
  const inputProps = {
    value: accountNumber,
    onChange: onChangeAccountNumber,
    maxLength: 26,
    onKeyPress: handleKeyPress,
    onKeyDown: e =>
      e.keyCode === 13 &&
      onEnterAccountNumber(accountNumber) &&
      e.preventDefault(),
    type: 'number',
    placeholder: intl.formatMessage({
      id: 'app.containers.PaymentPage.inputAccountNumber',
      defaultMessage: 'Search for the account number...',
    }),
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

      <form
        noValidate
        autoComplete="off"
        onSubmit={() => onEnterAuthorizationKey(authorizationKey)}
      >
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

            {error && (
              <LabelWrapper large error={error}>
                {error}
              </LabelWrapper>
            )}

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
                  onKeyDown={e =>
                    e.keyCode === 13 &&
                    onEnterAmountMoney(amountMoney) &&
                    e.preventDefault()
                  }
                  placeholder={placeholder}
                  type="number"
                  error={error}
                />
              )}
            </FormattedMessage>

            {error && (
              <LabelWrapper large error={error}>
                {error}
              </LabelWrapper>
            )}

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
                  onKeyDown={e =>
                    e.keyCode === 13 &&
                    onEnterTransferTitle(transferTitle) &&
                    e.preventDefault()
                  }
                  placeholder={placeholder}
                  type="text"
                  error={error}
                />
              )}
            </FormattedMessage>

            {error && (
              <LabelWrapper large error={error}>
                {error}
              </LabelWrapper>
            )}

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
            <div>
              <LabelWrapper large>
                <FormattedMessage {...messages.stepAccountNumber} />
              </LabelWrapper>

              <InputWrapper
                large
                key={1}
                readOnly
                value={accountNumber}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div>
              <LabelWrapper large>
                <FormattedMessage {...messages.stepAmountOfMoney} />
              </LabelWrapper>

              <InputWrapper
                large
                key={2}
                onKeyDown={handleKeyDown}
                value={`${amountMoney} ${currency}`}
                readOnly
              />
            </div>

            <div>
              <LabelWrapper large>
                <FormattedMessage {...messages.stepTransferTitle} />
              </LabelWrapper>

              <InputWrapper
                large
                key={3}
                value={transferTitle}
                onKeyDown={handleKeyDown}
                readOnly
              />
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

            {message && <TextWrapper large>{message}</TextWrapper>}

            {isSendAuthorizationKey && (
              <Fragment>
                <ConfirmPaymentWrapper>
                  <FormattedMessage {...messages.inputAuthorizationKey}>
                    {placeholder => (
                      <InputWrapper
                        key={4}
                        onChange={onChangeAuthorizationKey}
                        type="text"
                        placeholder={placeholder}
                        error={error}
                      />
                    )}
                  </FormattedMessage>

                  <ButtonWrapper
                    margin="false"
                    type="submit"
                    onClick={() => onEnterAuthorizationKey(authorizationKey)}
                    disabled={isLoading}
                  >
                    <FormattedMessage {...messages.inputMakePayment} />
                  </ButtonWrapper>
                </ConfirmPaymentWrapper>

                {error && (
                  <LabelWrapper large error={error}>
                    {error}
                  </LabelWrapper>
                )}

                <TextWrapper large>
                  {suggestionAuthorizationKey ? (
                    <Fragment>
                      <FormattedMessage {...messages.yourCodeIs} />{' '}
                      <SuggestionAuthorizationKeyWrapper>
                        {suggestionAuthorizationKey}
                      </SuggestionAuthorizationKeyWrapper>
                    </Fragment>
                  ) : (
                    <FlatButtonWrapper
                      type="button"
                      onClick={handleAuthorizationKey}
                    >
                      <FormattedMessage {...messages.noEmailWithoutCode} />
                    </FlatButtonWrapper>
                  )}
                </TextWrapper>
              </Fragment>
            )}
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
      <AutosuggestSuggestionsAccountNumberWrapper>
        {suggestion.account_bill
          .toString()
          .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
          .trim()}
      </AutosuggestSuggestionsAccountNumberWrapper>
      <AutosuggestSuggestionsListWrapper>
        {suggestion.user.name} {suggestion.user.surname}
      </AutosuggestSuggestionsListWrapper>
    </div>
  );
}

PaymentForm.propTypes = {
  accountNumber: PropTypes.string,
  amountMoney: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  intl: PropTypes.object,
  suggestions: PropTypes.array,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  transferTitle: PropTypes.string,
  authorizationKey: PropTypes.string,
  suggestionAuthorizationKey: PropTypes.string,
  activeStep: PropTypes.number,
  currency: PropTypes.string,
  isLoading: PropTypes.bool,
  isSendAuthorizationKey: PropTypes.bool,
  handleStepBack: PropTypes.func,
  handleKeyDown: PropTypes.func,
  handleKeyPress: PropTypes.func,
  handleSuggestionsFetchRequested: PropTypes.func,
  handleSuggestionsClearRequested: PropTypes.func,
  handleCurrency: PropTypes.func,
  handleAuthorizationKey: PropTypes.func,
  onChangeAccountNumber: PropTypes.func,
  onEnterAccountNumber: PropTypes.func,
  onChangeAmountMoney: PropTypes.func,
  onEnterAmountMoney: PropTypes.func,
  onChangeTransferTitle: PropTypes.func,
  onChangeAuthorizationKey: PropTypes.func,
  onEnterTransferTitle: PropTypes.func,
  onSendAuthorizationKey: PropTypes.func,
  onEnterAuthorizationKey: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  accountNumber: makeAccountNumberSelector(),
  amountMoney: makeAmountMoneySelector(),
  transferTitle: makeTransferTitleSelector(),
  authorizationKey: makeAuthorizationKeySelector(),
  suggestionAuthorizationKey: makeSuggestionAuthorizationKeySelector(),
  activeStep: makeActiveStepSelector(),
  isSendAuthorizationKey: makeIsSendAuthorizationKeySelector(),
  isLoading: makeIsLoadingSelector(),
  message: makeMessageSelector(),
  error: makeErrorSelector(),
  currency: makeCurrencySelector(),
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
    onChangeAuthorizationKey: e =>
      dispatch(changeAuthorizationKeyAction(e.target.value)),
    onEnterAuthorizationKey: authorizationKey =>
      dispatch(enterAuthorizationKeyAction(authorizationKey)),
    onSendAuthorizationKey: () => dispatch(sendAuthorizationKeyAction()),
    handleSuggestionsFetchRequested: ({ value }) =>
      dispatch(searchAccountBillsAction(value)),
    handleSuggestionsClearRequested: () => dispatch(clearAccountBillsAction()),
    handleStepBack: () => dispatch(stepBackAction()),
    handleCurrency: () => dispatch(getCurrencyAction()),
    handleAuthorizationKey: () => dispatch(getAuthorizationKeyAction()),
    handleKeyPress: e => (e.key === 'E' || e.key === 'e') && e.preventDefault(),
    handleKeyDown: e => e.keyCode === 13 && e.preventDefault(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(PaymentForm);
