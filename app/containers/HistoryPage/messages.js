/*
 * HistoryPage Messages
 *
 * This contains all the text for the HistoryPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HistoryPage';

export default defineMessages({
  helmetHistoryTitle: {
    id: `${scope}.helmetHistoryTitle`,
    defaultMessage: 'History · Bank Application',
  },
  earnings: {
    id: `${scope}.earnings`,
    defaultMessage: 'Your earnings',
  },
  expenses: {
    id: `${scope}.expenses`,
    defaultMessage: 'Your expenses',
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Date',
  },
  sender: {
    id: `${scope}.sender`,
    defaultMessage: 'Sender',
  },
  recipient: {
    id: `${scope}.recipient`,
    defaultMessage: 'Recipient',
  },
  transferTitle: {
    id: `${scope}.transferTitle`,
    defaultMessage: 'Transfer title',
  },
  amount: {
    id: `${scope}.amount`,
    defaultMessage: 'Amount',
  },
  accountNumber: {
    id: `${scope}.accountNumber`,
    defaultMessage: 'Account number',
  },
  of: {
    id: `${scope}.of`,
    defaultMessage: 'of',
  },
});
