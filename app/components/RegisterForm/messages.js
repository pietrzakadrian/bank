/*
 * RegisterForm Messages
 *
 * This contains all the text for the RegisterForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.RegisterForm';

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
  inputNumber: {
    id: `${scope}.inputNumber`,
    defaultMessage: 'Enter an ID',
  },
});
