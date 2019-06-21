/*
 * BankDeposits Messages
 *
 * This contains all the text for the BankDeposits component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BankDeposits';

export default defineMessages({
  bankDeposits: {
    id: `${scope}.bankDeposits`,
    defaultMessage: 'Deposits',
  },
  depositDisabled: {
    id: `${scope}.depositDisabled`,
    defaultMessage: 'The Deposits function is disabled.',
  },
  newDeposit: {
    id: `${scope}.newDeposit`,
    defaultMessage: 'New deposit',
  },
});
