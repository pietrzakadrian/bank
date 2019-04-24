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
});
