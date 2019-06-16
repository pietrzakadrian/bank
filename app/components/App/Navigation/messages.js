/*
 * Navigation Messages
 *
 * This contains all the text for the Navigation component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Navigation';

export default defineMessages({
  dashboardItem: {
    id: `${scope}.dashboardItem`,
    defaultMessage: 'Dashboard',
  },
  paymentItem: {
    id: `${scope}.paymentItem`,
    defaultMessage: 'Payment',
  },
  billsItem: {
    id: `${scope}.billsItem`,
    defaultMessage: 'Bills',
  },
  historyItem: {
    id: `${scope}.historyItem`,
    defaultMessage: 'History',
  },
  creditsItem: {
    id: `${scope}.creditsItem`,
    defaultMessage: 'Credits',
  },
  depositsItem: {
    id: `${scope}.depositsItem`,
    defaultMessage: 'Deposits',
  },
  cardsItem: {
    id: `${scope}.cardsItem`,
    defaultMessage: 'Cards',
  },
  settingsItem: {
    id: `${scope}.settingsItem`,
    defaultMessage: 'Settings',
  },
});
