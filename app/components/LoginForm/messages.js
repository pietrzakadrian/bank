/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LoginForm';

export default defineMessages({
  loginError: {
    id: `${scope}.loginError`,
    defaultMessage: 'Please enter the correct ID',
  },
  passwordError: {
    id: `${scope}.passwordError`,
    defaultMessage: 'Please enter the correct access code',
  },
  loginEmpty: {
    id: `${scope}.loginEmpty`,
    defaultMessage: 'Please enter the ID',
  },
  passwordEmpty: {
    id: `${scope}.passwordEmpty`,
    defaultMessage: 'Please enter the access code',
  },
  loginToTheSystem: {
    id: `${scope}.loginToTheSystem`,
    defaultMessage: 'Login',
  },
  helmetLoginTitle: {
    id: `${scope}.helmetPaymentTitle`,
    defaultMessage: 'Login · Bank Application',
  },
  numberId: {
    id: `${scope}.numberId`,
    defaultMessage: 'ID number',
  },
  accessCode: {
    id: `${scope}.accessCode`,
    defaultMessage: 'Access code',
  },
  nextText: {
    id: `${scope}.nextText`,
    defaultMessage: 'Next',
  },
  backText: {
    id: `${scope}.backText`,
    defaultMessage: 'Back',
  },
  inputNumber: {
    id: `${scope}.inputNumber`,
    defaultMessage: 'Enter the number',
  },
  inputPassowrd: {
    id: `${scope}.inputPassowrd`,
    defaultMessage: 'Enter the access code',
  },
  inputLogin: {
    id: `${scope}.inputLogin`,
    defaultMessage: 'Log in',
  },
  serverError: {
    id: `${scope}.serverError`,
    defaultMessage: 'Please try again in a moment',
  },
});
