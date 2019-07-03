/*
 * RegisterPage Messages
 *
 * This contains all the text for the RegisterPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RegisterPage';

export default defineMessages({
  nextText: {
    id: `${scope}.nextText`,
    defaultMessage: 'Next',
  },
  backText: {
    id: `${scope}.backText`,
    defaultMessage: 'Back',
  },
  createAnAccount: {
    id: `${scope}.createAnAccount`,
    defaultMessage: 'Create an account',
  },
  registerText: {
    id: `${scope}.registerText`,
    defaultMessage: 'Registration',
  },
  helmetRegisterTitle: {
    id: `${scope}.helmetRegisterTitle`,
    defaultMessage: 'Registration · Bank Application',
  },
  errorName: {
    id: `${scope}.errorName`,
    defaultMessage: 'Please enter your first name',
  },
  errorNameCorrect: {
    id: `${scope}.errorNameCorrect`,
    defaultMessage: 'Please enter the correct first name',
  },
  errorSurname: {
    id: `${scope}.errorSurname`,
    defaultMessage: 'Please enter your surname',
  },
  errorSurnameCorrect: {
    id: `${scope}.errorSurnameCorrect`,
    defaultMessage: 'Please enter the correct surname',
  },
  errorPassword: {
    id: `${scope}.errorPassword`,
    defaultMessage: 'Please enter your access code',
  },
  errorPasswordCorrect: {
    id: `${scope}.errorPasswordCorrect`,
    defaultMessage: 'Please enter the correct access code',
  },
  succesCreated: {
    id: `${scope}.succesCreated`,
    defaultMessage: 'Success! The account has been created',
  },
  enterEmailEmpty: {
    id: `${scope}.enterEmailEmpty`,
    defaultMessage: 'Please enter your email address',
  },
  invalidId: {
    id: `${scope}.invalidId`,
    defaultMessage: 'The account pin must consist only of digits',
  },
  existAccountWithSameEmail: {
    id: `${scope}.existAccountWithSameEmail`,
    defaultMessage: 'An account with this E-Mail address already exists',
  },
  entercurrency: {
    id: `${scope}.entercurrency`,
    defaultMessage: 'Please enter the currency',
  },
  errorServer: {
    id: `${scope}.errorServer`,
    defaultMessage: 'Please try again in a moment',
  },
  inputEmailAddressEmpty: {
    id: `${scope}.inputEmailAddressEmpty`,
    defaultMessage: 'Please enter the email address',
  },
  inputIDEmpty: {
    id: `${scope}.inputIDEmpty`,
    defaultMessage: 'Please enter the account pin',
  },
  inputIDExists: {
    id: `${scope}.inputIDExists`,
    defaultMessage: 'An account with this pin already exists',
  },
  errorIncorrectEmail: {
    id: `${scope}.errorIncorrectEmail`,
    defaultMessage: 'Please enter the correct email address',
  },
  errorCheckbox: {
    id: `${scope}.errorCheckbox`,
    defaultMessage:
      'Please confirm your consent to the processing of your personal data.',
  },
  systemError: {
    id: `${scope}.systemError`,
    defaultMessage: 'Sorry, you unable to register account',
  },
});
