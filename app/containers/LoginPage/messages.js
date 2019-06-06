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
});
