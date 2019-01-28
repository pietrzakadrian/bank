module.exports = function(app) {
  const transactions = require('../controllers/transaction.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');

  // Create a new Transactions
  app.post('/api/transactions', checkAuth, checkToken, transactions.create);

  // Return Recipient's Transaction Data
  app.get(
    '/api/transactions/recipient/:recipientId',
    checkAuth,
    checkToken,
    transactions.getRecipientdata,
  );

  // Return Sender's Transaction Data
  app.get(
    '/api/transactions/sender/:senderId',
    checkAuth,
    checkToken,
    transactions.getSenderdata,
  );
};
