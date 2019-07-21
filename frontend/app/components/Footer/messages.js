/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Footer';

export default defineMessages({
  boldMainText: {
    id: `${scope}.boldMainText`,
    defaultMessage:
      'If you do not have an account in our bank, you can create now by clicking on',
  },
  boldMainTextLogin: {
    id: `${scope}.boldMainTextLogin`,
    defaultMessage:
      'If you already have a bank account, you can log in by clicking on',
  },
  registerButton: {
    id: `${scope}.registerButton`,
    defaultMessage: 'Registration',
  },
  loginButton: {
    id: `${scope}.loginButton`,
    defaultMessage: 'Log in',
  },
  footerInfo1: {
    id: `${scope}.footerInfo1`,
    defaultMessage: 'Remember the basic safety rules.',
  },
  footerInfo2: {
    id: `${scope}.footerInfo2`,
    defaultMessage:
      'Before you enter your ID number and access password on your website, make sure',
  },
  footerLiElement1: {
    id: `${scope}.footerLiElement1`,
    defaultMessage:
      'Your password is secure. It contains at least 8 characters and consists of uppercase and lowercase letters',
  },
  footerLiElement2: {
    id: `${scope}.footerLiElement2`,
    defaultMessage:
      'in the address bar or status bar, a padlock is visible at the bottom of the browser screen',
  },
  footerAlertText1: {
    id: `${scope}.footerAlertText1`,
    defaultMessage:
      'Remember: The bank does not require confirmation of any data, correct login or reading of the Banks messages by means of SMS, TAN and / or e-mail, or installation of any applications on the users phones or computers.',
  },
  footerAlertText2: {
    id: `${scope}.footerAlertText2`,
    defaultMessage:
      'This site uses cookies to provide services at the highest level. By clicking or navigating the site, you agree to allow our collection of information on through cookies. For more information on security, please visit:',
  },
  privacyRules: {
    id: `${scope}.privacyRules`,
    defaultMessage: 'Privacy rules',
  },
});
