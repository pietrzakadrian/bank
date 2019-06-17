/*
 * GreetingHeader Messages
 *
 * This contains all the text for the GreetingHeader component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.GreetingHeader';

export default defineMessages({
  lastSuccessfulLoginInformation: {
    id: `${scope}.lastSuccessfulLoginInformation`,
    defaultMessage: 'Last successful login:',
  },
  lastFailedLoginInformation: {
    id: `${scope}.lastFailedLoginInformation`,
    defaultMessage: 'Last failed login:',
  },
  greetingAm: {
    id: `${scope}.greetingAm`,
    defaultMessage: 'Good morning',
  },
  greetingPm: {
    id: `${scope}.greetingPm`,
    defaultMessage: 'Good evening',
  },
});
