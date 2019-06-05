/*
 * LocaleToggle Messages
 *
 * This contains all the text for the LanguageToggle component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LocaleToggle';

export default defineMessages({
  en: {
    id: `${scope}.en`,
    defaultMessage: 'EN',
  },
  de: {
    id: `${scope}.de`,
    defaultMessage: 'DE',
  },
  pl: {
    id: `${scope}.pl`,
    defaultMessage: 'PL',
  },
});
