/*
 * Header Messages
 *
 * This contains all the text for the Header container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Header';

export default defineMessages({
  dashboardTitle: {
    id: `${scope}.dashboard`,
    defaultMessage: 'Dashboard',
  },
  paymentTitle: {
    id: `${scope}.payment`,
    defaultMessage: 'Payment',
  },
  settingsTitle: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  headerItemMessagesTitle: {
    id: `${scope}.headerItemMessages`,
    defaultMessage: 'Messages',
  },
  headerItemNotificationsTitle: {
    id: `${scope}.headerItemNotifications`,
    defaultMessage: 'Notifications',
  },
  headerItemLogoutTitle: {
    id: `${scope}.headerItemNotifications`,
    defaultMessage: 'Logout',
  },
});
