/*
 * Notifications Messages
 *
 * This contains all the text for the Notifications component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Notifications';

export default defineMessages({
  noNotifications: {
    id: `${scope}.noNotifications`,
    defaultMessage: 'No notifications.',
  },
  getTrasnfer: {
    id: `${scope}.getTrasnfer`,
    defaultMessage: 'You received a cash transfer from',
  },
  worth: {
    id: `${scope}.worth`,
    defaultMessage: 'worth',
  },
});
