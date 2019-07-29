/*
 * Messages Messages
 *
 * This contains all the text for the Messages component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Messages';

export default defineMessages({
  noMessages: {
    id: `${scope}.noMessages`,
    defaultMessage: 'No messages.',
  },
  getMessage: {
    id: `${scope}.getMessage`,
    defaultMessage: 'from',
  },
  numberOfMessages: {
    id: `${scope}.numberOfMessages`,
    defaultMessage: 'New messages:',
  },
  markAsRead: {
    id: `${scope}.markAsRead`,
    defaultMessage: 'Mark as read',
  },
  part1: {
    id: `${scope}.part1`,
    defaultMessage: 'My name is Adrian Pietrzak. I am a',
  },
  part1dot1: {
    id: `${scope}.part1dot1`,
    defaultMessage:
      '-year-old developer and I focus on programming graphical user interfaces and scalable ...',
  },
});
