/*
 * PaymentPage Messages
 *
 * This contains all the text for the PaymentPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PaymentPage';

export default defineMessages({
  helmetPaymentTitle: {
    id: `${scope}.helmetPaymentTitle`,
    defaultMessage: 'Payment · Bank Application',
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
    defaultMessage: 'You do not have sufficient funds in your account',
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
  emptyKeyIncorrect: {
    id: `${scope}.errorKeyIncorrect`,
    defaultMessage: 'Please enter the authorization code',
  },
  errorKeyIncorrect: {
    id: `${scope}.errorKeyIncorrect`,
    defaultMessage: 'The entered authorization code is incorrect',
  },
  paymentHasBeenSent: {
    id: `${scope}.paymentHasBeenSent`,
    defaultMessage: 'Success! The transfer has been made',
  },
  errorKeyServer: {
    id: `${scope}.errorKeyServer`,
    defaultMessage: 'Please try again in a moment',
  },
});
