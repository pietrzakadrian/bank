/*
 * BankInformation Messages
 *
 * This contains all the text for the BankInformation component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.BankInformation';

export default defineMessages({
  bankInformation: {
    id: `${scope}.bankInformation`,
    defaultMessage:
      'Did you know that transfers in our bank arrive immediately?',
  },
});
