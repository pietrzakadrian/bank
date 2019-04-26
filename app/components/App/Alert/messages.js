/*
 * Alert Messages
 *
 * This contains all the text for the Alert component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Alert';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Alert component!',
  },
});
