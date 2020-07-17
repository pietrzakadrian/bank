/*
 * CurrencyAlert Messages
 *
 * This contains all the text for the CurrencyAlert component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.CurrencyAlert';

export default defineMessages({
  contentAlert: {
    id: `${scope}.contentAlert`,
    defaultMessage:
      'You are trying to change the currency. This will result in currency conversion of your available funds according to the exchange rate. Are you sure you want to do this?',
  },
  contentTitle: {
    id: `${scope}.contentTitle`,
    defaultMessage: 'Change currency',
  },
  disagree: {
    id: `${scope}.disagree`,
    defaultMessage: 'Disagree',
  },
  agree: {
    id: `${scope}.agree`,
    defaultMessage: 'Agree',
  },
});
