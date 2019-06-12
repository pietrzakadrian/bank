/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  loginToTheSystem: {
    id: `${scope}.loginToTheSystem`,
    defaultMessage: 'Log in',
  },
  helmetLoginTitle: {
    id: `${scope}.helmetPaymentTitle`,
    defaultMessage: 'Login · Bank Application',
  },
  loginError: {
    id: `${scope}.loginError`,
    defaultMessage: 'Please enter the correct account pin',
  },
  passwordError: {
    id: `${scope}.passwordError`,
    defaultMessage: 'Please enter the correct access code',
  },
  loginEmpty: {
    id: `${scope}.loginEmpty`,
    defaultMessage: 'Please enter the account pin',
  },
  passwordEmpty: {
    id: `${scope}.passwordEmpty`,
    defaultMessage: 'Please enter the access code',
  },
  serverError: {
    id: `${scope}.serverError`,
    defaultMessage: 'Please try again in a moment',
  },
  loginAttemptError: {
    id: `${scope}.serverError`,
    defaultMessage: 'Please enter the correct account pin or access code',
  },
});
