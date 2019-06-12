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
    defaultMessage: 'Enter the account pin',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'First name',
  },
  surname: {
    id: `${scope}.surname`,
    defaultMessage: 'Surname',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Access code',
  },
  currency: {
    id: `${scope}.currency`,
    defaultMessage: 'Currency',
  },
  idNumber: {
    id: `${scope}.idNumber`,
    defaultMessage: 'Account pin',
  },
  emailAddress: {
    id: `${scope}.emailAddress`,
    defaultMessage: 'Email address',
  },
  inputEmail: {
    id: `${scope}.inputEmail`,
    defaultMessage: 'Enter the email address',
  },
  inputName: {
    id: `${scope}.inputName`,
    defaultMessage: 'Enter the first name',
  },
  inputSurname: {
    id: `${scope}.inputSurname`,
    defaultMessage: 'Enter the surname',
  },
  inputPassword: {
    id: `${scope}.inputPassword`,
    defaultMessage: 'Enter the access code',
  },
  checkboxRodo: {
    id: `${scope}.checkboxRodo`,
    defaultMessage: 'I consent to the processing of my personal data.',
  },
  textEmailNeed: {
    id: `${scope}.textEmailNeed`,
    defaultMessage:
      'Account registration does not require confirmation by e-mail, but the transfer must be confirmed with a code that will come to your e-mail address.',
  },
});
