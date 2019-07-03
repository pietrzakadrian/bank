/*
 * Information Messages
 *
 * This contains all the text for the Information component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Information';

export default defineMessages({
  informationText: {
    id: `${scope}.informationText`,
    defaultMessage:
      'If you take advantage of our promotion and register your account by the end of June in our bank, you will receive 10 USD from us. Accounts already created will also receive this from us.',
  },
});
