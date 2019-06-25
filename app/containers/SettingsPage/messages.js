/*
 * SettingsPage Messages
 *
 * This contains all the text for the SettingsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SettingsPage';

export default defineMessages({
  helmetSettingsTitle: {
    id: `${scope}.helmetSettingsTitle`,
    defaultMessage: 'Settings · Bank Application',
  },
  changeName: {
    id: `${scope}.changeName`,
    defaultMessage: 'Change name',
  },
  errorChangeName: {
    id: `${scope}.errorChangeName`,
    defaultMessage: 'Your new name is incorrect.',
  },
  errorChangeSurname: {
    id: `${scope}.errorChangeSurname`,
    defaultMessage: 'Your new surname is incorrect.',
  },
  errorLenghtChangeSurname: {
    id: `${scope}.errorLenghtChangeSurname`,
    defaultMessage: 'Your new surname is too long.',
  },
  errorLenghtChangeEmail: {
    id: `${scope}.errorLenghtChangeEmail`,
    defaultMessage: 'Your new email is too long.',
  },
  errorChangePassword: {
    id: `${scope}.errorChangePassword`,
    defaultMessage: 'Your new password is too long.',
  },
  errorLenghtChangeName: {
    id: `${scope}.errorLenghtChangeName`,
    defaultMessage: 'Your new name is too long.',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'Your new email is incorrect.',
  },
  existAccountWithSameEmail: {
    id: `${scope}.existAccountWithSameEmail`,
    defaultMessage: 'An account with this E-Mail address already exists',
  },
  inputNewName: {
    id: `${scope}.inputNewName`,
    defaultMessage: 'Enter your new name',
  },
  changeSurname: {
    id: `${scope}.changeSurname`,
    defaultMessage: 'Change surname',
  },
  inputNewSurname: {
    id: `${scope}.inputNewSurname`,
    defaultMessage: 'Enter your new surname',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'Change password',
  },
  inputNewPassword: {
    id: `${scope}.inputNewPassword`,
    defaultMessage: 'Enter your new password',
  },
  changeEmail: {
    id: `${scope}.changeEmail`,
    defaultMessage: 'Change email',
  },
  inputNewEmail: {
    id: `${scope}.inputNewEmail`,
    defaultMessage: 'Enter your new email',
  },
  saveData: {
    id: `${scope}.saveData`,
    defaultMessage: 'Save',
  },
  saveDataEmpty: {
    id: `${scope}.saveDataEmpty`,
    defaultMessage: 'Enter the data to change',
  },
  changeLang: {
    id: `${scope}.changeLang`,
    defaultMessage: 'Change language',
  },
  changeCurrency: {
    id: `${scope}.changeCurrency`,
    defaultMessage: 'Change currency',
  },
  serverError: {
    id: `${scope}.serverError`,
    defaultMessage: 'Server error',
  },
  contactTheDeveloper: {
    id: `${scope}.contactTheDeveloper`,
    defaultMessage: 'Contact the developer',
  },
  reportError: {
    id: `${scope}.reportError`,
    defaultMessage: 'Report an error',
  },
  sendMessgeToAuthor: {
    id: `${scope}.sendMessgeToAuthor`,
    defaultMessage: 'Send message',
  },
  saveDataSuccess: {
    id: `${scope}.saveDataSuccess`,
    defaultMessage: 'Changes have been saved.',
  },
  1: {
    id: `${scope}.USD`,
    defaultMessage: 'USD',
  },
  2: {
    id: `${scope}.PLN`,
    defaultMessage: 'PLN',
  },
  3: {
    id: `${scope}.EUR`,
    defaultMessage: 'EUR',
  },
  saveCurrencySuccess: {
    id: `${scope}.saveCurrencySuccess`,
    defaultMessage: 'The currency has been changed successfully.',
  },
});
