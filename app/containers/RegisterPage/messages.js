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
  errorSurname: {
    id: `${scope}.errorSurname`,
    defaultMessage: 'Please enter your surname',
  },
  errorNameLenght: {
    id: `${scope}.errorNameLenght`,
    defaultMessage: 'The given name is too long.',
  },
  errorSurnameLenght: {
    id: `${scope}.errorSurnameLenght`,
    defaultMessage: 'The given surname is too long.',
  },
  errorPassword: {
    id: `${scope}.errorPassword`,
    defaultMessage: 'Please enter your password',
  },
  succesCreated: {
    id: `${scope}.succesCreated`,
    defaultMessage: 'Success! The account has been created',
  },
  invalidEmail: {
    id: `${scope}.invalidEmail`,
    defaultMessage: 'Invalid E-Mail',
  },
  invalidId: {
    id: `${scope}.invalidId`,
    defaultMessage: 'Id can not contain letters!',
  },
  invalidIdLenght: {
    id: `${scope}.invalidIdLenght`,
    defaultMessage: 'The given id is too long',
  },
  existAccountWithSameEmail: {
    id: `${scope}.existAccountWithSameEmail`,
    defaultMessage: 'An account with this E-Mail address already exists',
  },
  errorServer: {
    id: `${scope}.errorServer`,
    defaultMessage: 'Please try again in a moment',
  },
  inputEmailAddressEmpty: {
    id: `${scope}.inputEmailAddressEmpty`,
    defaultMessage: 'Please enter the E-Mail address',
  },
  inputIDEmpty: {
    id: `${scope}.inputIDEmpty`,
    defaultMessage: 'Please enter the ID',
  },
  inputIDExists: {
    id: `${scope}.inputIDExists`,
    defaultMessage: 'An account with this id number already exists',
  },
  emailInformation: {
    id: `${scope}.emailInformation`,
    defaultMessage:
      'The system does not require confirmation of registration by e-mail, but requires confirmation of payment with a code that you will receive by e-mail.',
  },
  errorEmailLenght: {
    id: `${scope}.errorEmailLenght`,
    defaultMessage: 'The given E-Mail is too long',
  },
  inputEmail: {
    id: `${scope}.inputEmail`,
    defaultMessage: 'Enter the E-Mail address',
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
    defaultMessage: 'Enter the password',
  },
  inputLogin: {
    id: `${scope}.inputLogin`,
    defaultMessage: 'Enter the ID number',
  },
  emailAddress: {
    id: `${scope}.emailAddress`,
    defaultMessage: 'E-mail address',
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
  idNumber: {
    id: `${scope}.idNumber`,
    defaultMessage: 'ID Number',
  },
  errorLenghtPassword: {
    id: `${scope}.errorLenghtPassword`,
    defaultMessage: 'Your password is too long.',
  },
  errorIncorrectEmail: {
    id: `${scope}.errorIncorrectEmail`,
    defaultMessage: 'Your email is incorrect.',
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
  errorCheckbox: {
    id: `${scope}.errorCheckbox`,
    defaultMessage:
      'Please confirm your consent to the processing of your personal data.',
  },
});
