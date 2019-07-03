/*
 * RecentTransactions Messages
 *
 * This contains all the text for the RecentTransactions component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.RecentTransactions';

export default defineMessages({
  recentTransactions: {
    id: `${scope}.recentTransactions`,
    defaultMessage: 'Recent Transactions',
  },
  fromPayment: {
    id: `${scope}.fromPayment`,
    defaultMessage: 'from',
  },
  toPayment: {
    id: `${scope}.toPayment`,
    defaultMessage: 'to',
  },
});
