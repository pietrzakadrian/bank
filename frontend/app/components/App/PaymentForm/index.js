/**
 *
 * PaymentForm
 *
 */

import React, { Fragment, useEffect } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/PaymentPage/reducer';
import saga from 'containers/PaymentPage/saga';

// Import Components
import Autosuggest from 'react-autosuggest';
import StepperWrapper from 'components/StepperWrapper';
import StepperDesktop from 'components/StepperDesktop';
import StepperMobile from 'components/StepperMobile';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import LabelWrapper from 'components/LabelWrapper';
import NavigateNextIcon from 'components/NavigateNextIcon';
import NavigateBackIcon from 'components/NavigateBackIcon';
import InputWrapper from 'components/InputWrapper';
import ButtonWrapper from 'components/ButtonWrapper';
import ButtonBackWrapper from 'components/ButtonBackWrapper';
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

// Import Actions
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

// Import Selectors
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

const stateSelector = createStructuredSelector({
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

const key = 'paymentPage';

function getSteps() {
  return [
    <FormattedMessage key={1} {...messages.stepAccountNumber} />,
    <FormattedMessage key={2} {...messages.stepAmountOfMoney} />,
    <FormattedMessage key={3} {...messages.stepTransferTitle} />,
    <FormattedMessage key={4} {...messages.stepConfirmTheData} />,
  ];
}

function getSuggestionValue(suggestion) {
  return suggestion.bill_accountBill;
}

function renderSuggestion(suggestion) {
  return (
    <div>
      <AutosuggestSuggestionsAccountNumberWrapper>
        {suggestion.bill_accountBill
          .toString()
          .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
          .trim()}
      </AutosuggestSuggestionsAccountNumberWrapper>
      <AutosuggestSuggestionsListWrapper>
        {suggestion.user_name} {suggestion.user_surname}
      </AutosuggestSuggestionsListWrapper>
    </div>
  );
}

function PaymentForm({ intl }) {
  const dispatch = useDispatch();
  const onChangeAccountNumber = (e, { newValue }) =>
    dispatch(changeAccountNumberAction(newValue));
  const onChangeAmountMoney = e =>
    dispatch(changeAmountMoneyAction(e.target.value));
  const onEnterAccountNumber = accountNumber =>
    dispatch(enterAccountNumberAction(accountNumber));
  const onEnterAmountMoney = amountMoney =>
    dispatch(enterAmountMoneyAction(amountMoney));
  const onChangeTransferTitle = e =>
    dispatch(changeTransferTitleAction(e.target.value));
  const onEnterTransferTitle = transferTitle =>
    dispatch(enterTransferTitleAction(transferTitle));
  const onChangeAuthorizationKey = e =>
    dispatch(changeAuthorizationKeyAction(e.target.value));
  const onEnterAuthorizationKey = authorizationKey =>
    dispatch(enterAuthorizationKeyAction(authorizationKey));
  const onSendAuthorizationKey = () => dispatch(sendAuthorizationKeyAction());
  const handleSuggestionsFetchRequested = ({ value }) =>
    dispatch(searchAccountBillsAction(value));
  const handleSuggestionsClearRequested = () =>
    dispatch(clearAccountBillsAction());
  const handleStepBack = () => dispatch(stepBackAction());
  const handleCurrency = () => dispatch(getCurrencyAction());
  const handleAuthorizationKey = () => dispatch(getAuthorizationKeyAction());
  const handleKeyPress = e =>
    (e.key === 'E' || e.key === 'e') && e.preventDefault();
  const handleKeyDown = e => e.keyCode === 13 && e.preventDefault();
  const {
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
  } = useSelector(stateSelector);
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

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  useEffect(() => {
    if (!currency) handleCurrency();
  }, []);

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

PaymentForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PaymentForm);
