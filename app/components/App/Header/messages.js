/*
 * Header Messages
 *
 * This contains all the text for the Header container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Header';

export default defineMessages({
  dashboardTitle: {
    id: `${scope}.dashboardTitle`,
    defaultMessage: 'Dashboard',
  },
  paymentTitle: {
    id: `${scope}.paymentTitle`,
    defaultMessage: 'Payment',
  },
  historyTitle: {
    id: `${scope}.historyTitle`,
    defaultMessage: 'History',
  },
  settingsTitle: {
    id: `${scope}.settingsTitle`,
    defaultMessage: 'Settings',
  },
  headerItemMessagesTitle: {
    id: `${scope}.headerItemMessagesTitle`,
    defaultMessage: 'Messages',
  },
  headerItemNotificationsTitle: {
    id: `${scope}.headerItemNotificationsTitle`,
    defaultMessage: 'Notifications',
  },
  headerItemLogoutTitle: {
    id: `${scope}.headerItemLogoutTitle`,
    defaultMessage: 'Logout',
  },
});
