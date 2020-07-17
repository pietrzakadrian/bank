/**
 *
 * PaymentForm
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/PaymentPage/reducer';
import saga from 'containers/PaymentPage/saga';

// Import Components
import * as Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/umd/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/umd/parse';
import MaskedInput from 'react-text-mask';
import StepperWrapper from 'components/StepperWrapper';
import StepperDesktop from 'components/StepperDesktop';
import StepperMobile from 'components/StepperMobile';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import LabelWrapper from 'components/LabelWrapper';
import NavigateNextIcon from 'components/NavigateNextIcon';
import NavigateBackIcon from 'components/NavigateBackIcon';
import SearchIcon from 'components/SearchIcon';
import InputWrapper from 'components/InputWrapper';
import ButtonWrapper from 'components/ButtonWrapper';
import ButtonBackWrapper from 'components/ButtonBackWrapper';
import TextWrapper from 'components/App/TextWrapper';
import FormWrapper from './FormWrapper';
import AutosuggestWrapper from './AutosuggestWrapper';
import AutosuggestInputWrapper from './AutosuggestInputWrapper';
import messages from './messages';
import AutosuggestSuggestionsListWrapper from './AutosuggestSuggestionsListWrapper';
import AutosuggestSuggestionsAccountNumberWrapper from './AutosuggestSuggestionsAccountNumberWrapper';
import ContainerWrapper from './ContainerWrapper';
import ConfirmPaymentWrapper from './ConfirmPaymentWrapper';
import FlatButtonWrapper from './FlatButtonWrapper';
import SuggestionAuthorizationKeyWrapper from './SuggestionAuthorizationKeyWrapper';
import AuthorizationKeyContainer from './AuthorizationKeyContainer';
import ConfirmLabelWrapper from './ConfirmLabelWrapper';

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
  makeRecipientNameSelector,
  makeRecipientSurnameSelector,
} from 'containers/PaymentPage/selectors';

const stateSelector = createStructuredSelector({
  accountNumber: makeAccountNumberSelector(),
  amountMoney: makeAmountMoneySelector(),
  transferTitle: makeTransferTitleSelector(),
  recipientName: makeRecipientNameSelector(),
  recipientSurname: makeRecipientSurnameSelector(),
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

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.bill_accountBill
    .toString()
    .replace(/(^\d{2}|\d{4})+?/g, '$1 ')}`;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <div>
      {parts.map((part, index) => {
        const className = part.highlight ? 'highlight' : null;

        return (
          <AutosuggestSuggestionsAccountNumberWrapper
            className={className}
            key={index}
          >
            {part.text}
          </AutosuggestSuggestionsAccountNumberWrapper>
        );
      })}

      <AutosuggestSuggestionsListWrapper>
        {suggestion.user_name} {suggestion.user_surname}
      </AutosuggestSuggestionsListWrapper>
    </div>
  );
}

function renderInputComponent(inputProps) {
  return (
    <AutosuggestInputWrapper>
      <MaskedInput
        ref={inputProps.ref || null}
        {...inputProps}
        guide={false}
        mask={[
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
      />

      <SearchIcon />
    </AutosuggestInputWrapper>
  );
}

function PaymentForm({ intl }) {
  const dispatch = useDispatch();
  const onChangeAccountNumber = (e, { newValue }) =>
    dispatch(changeAccountNumberAction(newValue));
  const onChangeAmountMoney = e =>
    dispatch(changeAmountMoneyAction(parseFloat(e.target.value)));
  const onEnterAccountNumber = accountNumber =>
    dispatch(enterAccountNumberAction(accountNumber));
  const onEnterAmountMoney = amountMoney =>
    dispatch(enterAmountMoneyAction(parseFloat(amountMoney).toFixed(2)));
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
    onKeyPress: handleKeyPress,
    onKeyDown: e =>
      e.keyCode === 13 &&
      onEnterAccountNumber(accountNumber) &&
      e.preventDefault(),
    placeholder: intl.formatMessage({
      id: 'app.components.PaymentForm.inputAccountNumber',
      defaultMessage: 'Search for the account number...',
    }),
  };

  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  useEffect(() => {
    handleCurrency();
  }, []);

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
        <form
          noValidate
          autoComplete="off"
          onSubmit={e =>
            onEnterAuthorizationKey(authorizationKey) && e.preventDefault()
          }
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
                  renderInputComponent={renderInputComponent}
                  inputProps={inputProps}
                  focusInputOnSuggestionClick={false}
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
                    value={amountMoney || ''}
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
                    key={2}
                    onChange={onChangeTransferTitle}
                    onKeyDown={e =>
                      e.keyCode === 13 &&
                      onEnterTransferTitle(transferTitle) &&
                      e.preventDefault()
                    }
                    placeholder={placeholder}
                    value={transferTitle || ''}
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
            <Fragment>
              <ContainerWrapper>
                <LabelWrapper large>
                  <FormattedMessage {...messages.stepAccountNumber} />
                </LabelWrapper>

                <ConfirmLabelWrapper>
                  {accountNumber.replace(/(^\d{2}|\d{4})+?/g, '$1 ')}
                </ConfirmLabelWrapper>

                <LabelWrapper large>
                  <FormattedMessage {...messages.stepAmountOfMoney} />
                </LabelWrapper>

                <ConfirmLabelWrapper>{`${amountMoney
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                  .replace('.', ',')} ${currency}`}</ConfirmLabelWrapper>

                <LabelWrapper large>
                  <FormattedMessage {...messages.stepTransferTitle} />
                </LabelWrapper>

                <ConfirmLabelWrapper>{transferTitle}</ConfirmLabelWrapper>

                <ButtonWrapper
                  large
                  type="button"
                  disabled={isLoading || isSendAuthorizationKey}
                  onClick={onSendAuthorizationKey}
                >
                  <FormattedMessage {...messages.inputReceiveCode} />
                  <NavigateNextIcon />
                </ButtonWrapper>
              </ContainerWrapper>

              <AuthorizationKeyContainer>
                {message && <TextWrapper large>{message}</TextWrapper>}

                {isSendAuthorizationKey && (
                  <Fragment>
                    <ConfirmPaymentWrapper>
                      <FormattedMessage {...messages.inputAuthorizationKey}>
                        {placeholder => (
                          <InputWrapper
                            key={6}
                            onChange={onChangeAuthorizationKey}
                            type="text"
                            placeholder={placeholder}
                            error={error}
                          />
                        )}
                      </FormattedMessage>

                      <ButtonWrapper
                        payment
                        margin="false"
                        type="submit"
                        onClick={() =>
                          onEnterAuthorizationKey(authorizationKey)
                        }
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
              </AuthorizationKeyContainer>
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
    </Fragment>
  );
}

getSuggestionValue.propTypes = {
  suggestion: PropTypes.shape({
    bill_accountBill: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    user_name: PropTypes.string.isRequired,
    user_surname: PropTypes.string.isRequired,
  }).isRequired,
};

renderSuggestion.propTypes = {
  suggestion: PropTypes.shape({
    bill_accountBill: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    user_name: PropTypes.string.isRequired,
    user_surname: PropTypes.string.isRequired,
  }).isRequired,
};

PaymentForm.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PaymentForm);
