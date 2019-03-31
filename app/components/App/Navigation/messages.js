/*
 * Navigation Messages
 *
 * This contains all the text for the Navigation component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Navigation';

export default defineMessages({
  dashboardItem: {
    id: `${scope}.dashboard`,
    defaultMessage: 'Dashboard',
  },
  paymentItem: {
    id: `${scope}.payment`,
    defaultMessage: 'Payment',
  },
  billsItem: {
    id: `${scope}.payment`,
    defaultMessage: 'Bills',
  },
  historyItem: {
    id: `${scope}.history`,
    defaultMessage: 'Transfer history',
  },
  creditsItem: {
    id: `${scope}.credits`,
    defaultMessage: 'Credits',
  },
  depositsItem: {
    id: `${scope}.deposits`,
    defaultMessage: 'Deposits',
  },
  cardsItem: {
    id: `${scope}.cards`,
    defaultMessage: 'Cards',
  },
  settingsItem: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
});
