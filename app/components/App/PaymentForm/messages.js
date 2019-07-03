/*
 * PaymentForm Messages
 *
 * This contains all the text for the PaymentForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.PaymentForm';

export default defineMessages({
  stepAccountNumber: {
    id: `${scope}.stepAccountNumber`,
    defaultMessage: 'Account number',
  },
  stepAmountOfMoney: {
    id: `${scope}.stepAmountOfMoney`,
    defaultMessage: 'Amount of money',
  },
  stepTransferTitle: {
    id: `${scope}.stepTransferTitle`,
    defaultMessage: 'Transfer title',
  },
  stepConfirmTheData: {
    id: `${scope}.stepConfirmTheData`,
    defaultMessage: 'Confirm the data',
  },
  inputAccountNumber: {
    id: `${scope}.inputAccountNumber`,
    defaultMessage: 'Search for the account number... *',
  },
  inputAuthorizationCoder: {
    id: `${scope}.inputAuthorizationCoder`,
    defaultMessage: 'Enter the authorization code',
  },
  inputAmountOfMoney: {
    id: `${scope}.inputAmountOfMoney`,
    defaultMessage: 'Enter the amount of money',
  },
  inputTransferTitle: {
    id: `${scope}.inputTransferTitle`,
    defaultMessage: 'Enter the transfer title',
  },
  inputAuthorizationKey: {
    id: `${scope}.inputAuthorizationKey`,
    defaultMessage: 'Enter the authorization key',
  },
  inputReceiveCode: {
    id: `${scope}.inputReceiveCode`,
    defaultMessage: 'Receive the code',
  },
  errorAccountNumberEmpty: {
    id: `${scope}.errorAccountNumberEmpty`,
    defaultMessage: 'Please enter the account number',
  },
  errorAccountNumberValidate: {
    id: `${scope}.errorAccountNumberIncorrect`,
    defaultMessage: 'Please enter the correct account number',
  },
  errorAmountOfMoneyEmpty: {
    id: `${scope}.errorAmountOfMoneyEmpty`,
    defaultMessage: 'Please enter the amount of money',
  },
  errorAmountOfMoneyIncorrect: {
    id: `${scope}.errorAmountOfMoneyIncorrect`,
    defaultMessage: 'You do not have that much money in your account',
  },
  errorTransferTitleIncorrect: {
    id: `${scope}.errorTransferTitleIncorrect`,
    defaultMessage: 'Please enter the transfer title',
  },
  errorTransferTitleLenght: {
    id: `${scope}.errorTransferTitleLenght`,
    defaultMessage: 'The given transfer title is too long',
  },
  keyHasBeenSent: {
    id: `${scope}.keyHasBeenSent`,
    defaultMessage: 'The authorization key has been sent',
  },
  errorKeyIncorrect: {
    id: `${scope}.errorKeyIncorrect`,
    defaultMessage: 'Incorrect authorization code.',
  },
  errorKeyServer: {
    id: `${scope}.errorKeyServer`,
    defaultMessage: 'Please try again in a moment',
  },
  paymentHasBeenSent: {
    id: `${scope}.paymentHasBeenSent`,
    defaultMessage: 'Success! The transfer has been made',
  },
  nextText: {
    id: `${scope}.nextText`,
    defaultMessage: 'Next',
  },
  backText: {
    id: `${scope}.backText`,
    defaultMessage: 'Back',
  },
  helmetPaymentTitle: {
    id: `${scope}.helmetPaymentTitle`,
    defaultMessage: 'Payment · Bank Application',
  },
  inputMakePayment: {
    id: `${scope}.inputMakePayment`,
    defaultMessage: 'Make a payment',
  },
  paymentEndAccountNumber: {
    id: `${scope}.paymentEndAccountNumber`,
    defaultMessage: 'Account number',
  },
  paymentEndTransferTitle: {
    id: `${scope}.paymentEndTransferTitle`,
    defaultMessage: 'Transfer title',
  },
  paymentEndAmountMoney: {
    id: `${scope}.paymentEndAmountMoney`,
    defaultMessage: 'Amount money',
  },
  systemErrorSendCode: {
    id: `${scope}.systemErrorSendCode`,
    defaultMessage: 'Please try again in a moment',
  },

  warningInfo1: {
    id: `${scope}.warningInfo1`,
    defaultMessage: 'Remember the basic safety rules.',
  },
  warningInfo2: {
    id: `${scope}.warningInfo2`,
    defaultMessage:
      "Before you enter the recipient's ID number and sent the money, make sure, that:",
  },
  warningLiElement1: {
    id: `${scope}.warningLiElement1`,
    defaultMessage: 'it is the right recipient',
  },
  warningLiElement2: {
    id: `${scope}.warningLiElement2`,
    defaultMessage: 'you have enough amount of money',
  },
  warningAlertText1: {
    id: `${scope}.warningAlertText1`,
    defaultMessage:
      'Remember that bank transfers take immediately and you can not cancel the transfer after it has been made.',
  },
  currency: {
    id: `${scope}.currency`,
    defaultMessage: 'USD',
  },
  noEmailWithoutCode: {
    id: `${scope}.noEmailWithoutCode`,
    defaultMessage: 'I did not receive an email with a code',
  },
  yourCodeIs: {
    id: `${scope}.yourCodeIs`,
    defaultMessage: 'Your authorization code is:',
  },
  searchInformation: {
    id: `${scope}.searchInformation`,
    defaultMessage:
      '* You can search for the account number by entering subsequent digits',
  },
});
