/*
 * Notification Messages
 *
 * This contains all the text for the Notification component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Notification';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NotificationContainer component!',
  },
});
