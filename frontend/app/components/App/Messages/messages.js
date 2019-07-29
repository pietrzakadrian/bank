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
  part2: {
    id: `${scope}.part2`,
    defaultMessage:
      '-year-old developer and I focus on programming graphical user interfaces and scalable network applications ...',
  },
  part3: {
    id: `${scope}.part3`,
    defaultMessage: '... and you are exactly the',
  },
  part4: {
    id: `${scope}.part4`,
    defaultMessage: 'person who has the opportunity to test my software. :)',
  },
  part5: {
    id: `${scope}.part5`,
    defaultMessage:
      "Software development in JavaScript is one of my hobbies. If you see my profile on GitHub, you'll find that it fills most of my time.",
  },
  part6: {
    id: `${scope}.part6`,
    defaultMessage:
      'Software development in JavaScript is one of my hobbies. If you see my',
  },
  part7: {
    id: `${scope}.part7`,
    defaultMessage: "you'll find that it fills most of my time.",
  },
  part8: {
    id: `${scope}.part8`,
    defaultMessage:
      "You see, I want to be expert at it, that's why I have a great request for you: write me a message about what you think about this application.",
  },
  part9: {
    id: `${scope}.part9`,
    defaultMessage: `I am very interested in how you personally picked up the project.
      Maybe you found some mistake I do not know about?
      Maybe you have an idea for expanding this project?
      Maybe you think you could bring something to my life, or`,
  },
  part10: {
    id: `${scope}.part10`,
    defaultMessage: `maybe we could create value for each other? ; )`,
  },
  part11: {
    id: `${scope}.part11`,
    defaultMessage: `I give you my email address:`,
  },
  part12: {
    id: `${scope}.part12`,
    defaultMessage: `and my facebook profile for looser conversations:`,
  },
  part13: {
    id: `${scope}.part13`,
    defaultMessage: `Thank you for agreeing to test my application. Thank you, I am sending you 5,00 USD. Be sure to check your transfers and change currency.`,
  },
  part14: {
    id: `${scope}.part14`,
    defaultMessage: `Yours faithfully,
    Adrian Pietrzak.`,
  },
});
