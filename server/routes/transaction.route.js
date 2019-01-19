module.exports = function(app) {
  const transactions = require('../controllers/transaction.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');

  // Create a new Transactions
  app.post('/api/transactions', checkAuth, transactions.create);

  app.get(
    '/api/transactions/recipient/:recipientId',
    checkAuth,
    transactions.getRecipientdata,
  );

  app.get(
    '/api/transactions/sender/:senderId',
    checkAuth,
    transactions.getSenderdata,
  );
};
