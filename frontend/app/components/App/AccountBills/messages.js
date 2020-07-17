/*
 * AccountBills Messages
 *
 * This contains all the text for the AccountBills component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AccountBills';

export default defineMessages({
  bills: {
    id: `${scope}.bills`,
    defaultMessage: 'Account Bills',
  },
  makeTransferBtn: {
    id: `${scope}.makeTransferBtn`,
    defaultMessage: 'Make a transfer',
  },
});
