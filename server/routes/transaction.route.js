module.exports = function(app) {
  const transactions = require('../controllers/transaction.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');

  // Create a new User
  app.post('/api/transactions', checkAuth, transactions.makePayment);

  // Retrieve all User
  app.get('/api/transactions', checkAuth, transactions.findAll);

  app.get(
    '/api/transactions/recipient/:transactionRecipientId',
    checkAuth,
    transactions.findAllByIdRecipient,
  );

  app.get(
    '/api/transactions/sender/:transactionSenderId',
    checkAuth,
    transactions.findAllByIdSender,
  );

  // Update a User with Id
  app.put('/api/transactions/:transactionId', transactions.update);

  // Delete a User with Id
  app.delete('/api/transactions/:transactionId', transactions.delete);
};
