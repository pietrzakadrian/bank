/*
 * GreetingHeader Messages
 *
 * This contains all the text for the GreetingHeader component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.GreetingHeader';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the GreetingHeader component!',
  },
});
