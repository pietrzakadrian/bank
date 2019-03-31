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
  currency: {
    id: `${scope}.currency`,
    defaultMessage: 'USD',
  },
  bankInformation: {
    id: `${scope}.bankInformation`,
    defaultMessage:
      'Did you know that transfers in our bank arrive immediately?',
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
  greeting: {
    id: `${scope}.greeting`,
    defaultMessage: 'Good morning',
  },
  lastSuccessfulLoginInformation: {
    id: `${scope}.lastSuccessfulLoginInformation`,
    defaultMessage: 'Last successful login:',
  },
  fromPayment: {
    id: `${scope}.fromPayment`,
    defaultMessage: 'from',
  },
  toPayment: {
    id: `${scope}.toPayment`,
    defaultMessage: 'to',
  },
  savings: {
    id: `${scope}.savings`,
    defaultMessage: 'Savings',
  },
  bills: {
    id: `${scope}.bills`,
    defaultMessage: 'Account Bills',
  },
  makeTransferBtn: {
    id: `${scope}.makeTransferBtn`,
    defaultMessage: 'Make a transfer',
  },
  availableFunds: {
    id: `${scope}.availableFunds`,
    defaultMessage: 'Available Funds',
  },
  recentTransactions: {
    id: `${scope}.recentTransactions`,
    defaultMessage: 'Recent Transactions',
  },
});
