/*
 * Messages Messages
 *
 * This contains all the text for the Messages component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Messages';

export default defineMessages({
  noMessages: {
    id: `${scope}.noMessages`,
    defaultMessage: 'No messages.',
  },
});
