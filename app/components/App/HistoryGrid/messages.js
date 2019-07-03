/*
 * HistoryGrid Messages
 *
 * This contains all the text for the HistoryGrid component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.HistoryGrid';

export default defineMessages({
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
    defaultMessage: 'Amount money',
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
