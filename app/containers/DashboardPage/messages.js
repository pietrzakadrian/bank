/*
 * DashboardPage Messages
 *
 * This contains all the text for the DashboardPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DashboardPage';

export default defineMessages({
  helmetDashboardTitle: {
    id: `${scope}.helmetDashboardTitle`,
    defaultMessage: 'Dashboard · Bank Application',
  },
  newPayment: {
    id: `${scope}.newPayment`,
    defaultMessage: 'New payment',
  },
  newCard: {
    id: `${scope}.newCard`,
    defaultMessage: 'New card',
  },
  newCredit: {
    id: `${scope}.newCredit`,
    defaultMessage: 'New credit',
  },
  newDeposit: {
    id: `${scope}.newDeposit`,
    defaultMessage: 'New deposit',
  },
  cardDisabled: {
    id: `${scope}.cardDisabled`,
    defaultMessage: 'The Cards function is disabled.',
  },
  creditDisabled: {
    id: `${scope}.creditDisabled`,
    defaultMessage: 'The Credits function is disabled.',
  },
  depositDisabled: {
    id: `${scope}.depositDisabled`,
    defaultMessage: 'The Deposits function is disabled.',
  },
  bankCards: {
    id: `${scope}.bankCards`,
    defaultMessage: 'Cards',
  },
  bankDeposits: {
    id: `${scope}.bankDeposits`,
    defaultMessage: 'Deposits',
  },
  bankCredits: {
    id: `${scope}.bankCredits`,
    defaultMessage: 'Credits',
  },
  availableFunds: {
    id: `${scope}.availableFunds`,
    defaultMessage: 'Available Funds',
  },
});
