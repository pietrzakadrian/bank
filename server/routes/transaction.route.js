/* eslint func-names: ["error", "never"] */
module.exports = function(app) {
  const transactions = require('../controllers/transaction.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');

  // Confirm a new Transactions
  app.post('/api/transactions', checkAuth, checkToken, transactions.confirm);

  // Register a new Transactions Action
  app.post(
    '/api/transactions/register',
    checkAuth,
    checkToken,
    transactions.register,
  );

  // Return Recipient's Transaction Data Action
  app.get(
    '/api/transactions/recipient/:recipientId',
    checkAuth,
    checkToken,
    transactions.getRecipientdata,
  );

  // Return Sender's Transaction Data Action
  app.get(
    '/api/transactions/sender/:senderId',
    checkAuth,
    checkToken,
    transactions.getSenderdata,
  );
};
