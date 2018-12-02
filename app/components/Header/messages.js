/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Header';

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
});
