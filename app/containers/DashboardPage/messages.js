/*
 * DashboardPage Messages
 *
 * This contains all the text for the DashboardPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DashboardPage';

export default defineMessages({
  bills: {
    id: `${scope}.bills`,
    defaultMessage: 'Account Bills',
  },
  makeTransferBtn: {
    id: `${scope}.makeTransferBtn`,
    defaultMessage: 'Make a transfer',
  },
  availableFunds: {
    id: `${scope}.availableFunds`,
    defaultMessage: 'Available Funds',
  },
  bankInformation: {
    id: `${scope}.bankInformation`,
    defaultMessage:
      'Did you know that transfers in our bank are coming in fast?',
  },
  recentTransactions: {
    id: `${scope}.recentTransactions`,
    defaultMessage: 'Recent Transactions',
  },
});
