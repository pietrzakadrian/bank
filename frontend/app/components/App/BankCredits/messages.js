/*
 * BankCredits Messages
 *
 * This contains all the text for the BankCredits component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BankCredits';

export default defineMessages({
  newCredit: {
    id: `${scope}.newCredit`,
    defaultMessage: 'New credit',
  },
  creditDisabled: {
    id: `${scope}.creditDisabled`,
    defaultMessage: 'The Credits function is disabled.',
  },
  bankCredits: {
    id: `${scope}.bankCredits`,
    defaultMessage: 'Credits',
  },
});
