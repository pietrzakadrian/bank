/*
 * Notification Messages
 *
 * This contains all the text for the Notification component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Notification';

export default defineMessages({
  NotificationHeader: {
    id: `${scope}.NotificationHeader`,
    defaultMessage:
      'If you take advantage of our promotion and register your account by the end of June in our bank, you will receive 10 USD from us. Accounts already created will also receive this from us.',
  },
});
