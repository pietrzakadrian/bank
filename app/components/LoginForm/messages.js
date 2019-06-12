/*
 * LoginForm Messages
 *
 * This contains all the text for the LoginForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LoginForm';

export default defineMessages({
  numberId: {
    id: `${scope}.numberId`,
    defaultMessage: 'Account pin',
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
    defaultMessage: 'Enter the account pin',
  },
  inputPassowrd: {
    id: `${scope}.inputPassowrd`,
    defaultMessage: 'Enter the access code',
  },
  inputLogin: {
    id: `${scope}.inputLogin`,
    defaultMessage: 'Log in',
  },
});
