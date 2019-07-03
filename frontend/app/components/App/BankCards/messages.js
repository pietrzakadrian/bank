/*
 * BankCards Messages
 *
 * This contains all the text for the BankCards component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BankCards';

export default defineMessages({
  bankCards: {
    id: `${scope}.bankCards`,
    defaultMessage: 'Cards',
  },
  newCard: {
    id: `${scope}.newCard`,
    defaultMessage: 'New card',
  },
  cardDisabled: {
    id: `${scope}.cardDisabled`,
    defaultMessage: 'The Cards function is disabled.',
  },
});
