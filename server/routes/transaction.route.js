/* eslint-disable global-require */
module.exports = function(app) {
  const transactions = require('../controllers/transaction.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');
  const { check } = require('express-validator/check');

  // Confirm a new Transactions
  app.post(
    '/api/transactions/confirm',
    checkAuth,
    checkToken,
    [
      check('account_bill')
        .isDecimal()
        .exists()
        .isLength({ min: 26, max: 26 }),
      check('id_sender')
        .isInt()
        .exists(),
      check('amount_money')
        .isNumeric()
        .exists(),
      check('transfer_title')
        .exists()
        .isString()
        .isLength({ max: 35 }),
      check('authorization_key').exists(),
    ],
    transactions.confirm,
  );

  // Register a new Transactions Action
  app.post(
    '/api/transactions/register',
    checkAuth,
    checkToken,
    [
      check('account_bill')
        .isDecimal()
        .exists()
        .isLength({ min: 26, max: 26 }),
      check('id_sender')
        .isInt()
        .exists(),
      check('amount_money')
        .isNumeric()
        .exists(),
      check('transfer_title')
        .exists()
        .isString()
        .isLength({ max: 35 }),
    ],
    transactions.register,
  );

  app.post(
    '/api/transactions/getTransactions',
    checkAuth,
    checkToken,
    [
      check('userId')
        .exists()
        .isInt(),
      check('offset')
        .exists()
        .isInt(),
    ],
    transactions.getTransactionsdata,
  );

  // Return Recipient's Transaction Data Action
  app.get(
    '/api/transactions/recipient/:recipientId',
    checkAuth,
    checkToken,
    [
      check('recipientId')
        .exists()
        .isInt(),
    ],
    transactions.getRecipientdata,
  );

  // Return Sender's Transaction Data Action
  app.get(
    '/api/transactions/sender/:senderId',
    checkAuth,
    checkToken,
    [
      check('senderId')
        .exists()
        .isInt(),
    ],
    transactions.getSenderdata,
  );

  // Return Sender's Authorization Key Actions
  app.post(
    '/api/transactions/authorizationKey',
    checkAuth,
    checkToken,
    [
      check('id_sender')
        .exists()
        .isInt(),
      check('recipient_id')
        .exists()
        .isInt(),
      check('amount_money')
        .isNumeric()
        .exists(),
      check('transfer_title')
        .exists()
        .isString()
        .isLength({ max: 35 }),
    ],
    transactions.getAuthorizationKey,
  );
};
