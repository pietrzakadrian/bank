/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
  helmetNotFoundPageTitle: {
    id: `${scope}.helmetNotFoundPageTitle`,
    defaultMessage: 'Not Found Page · Bank Application',
  },
  notFoundPage: {
    id: `${scope}.notFoundPage`,
    defaultMessage: 'Not Found Page',
  },
  sorryThisPageIsUnavailable: {
    id: `${scope}.sorryThisPageIsUnavailable`,
    defaultMessage: "We're sorry, this page is unavailable.",
  },
  sorrySubheader: {
    id: `${scope}.sorrySubheader`,
    defaultMessage:
      'The link clicked may have been corrupted or the page may have been deleted.',
  },
});
