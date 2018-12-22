module.exports = function(app) {
  const bills = require('../controllers/bill.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');

  // Create a new User
  app.post('/api/bills', checkAuth, bills.create);

  // Retrieve all User
  // app.get('/api/bills', checkAuth, bills.findAll);

  // // Retrieve a single User by Id
  // app.get('/api/bills/:billId', bills.findById);

  // Retrieve a single User by Id
  app.get('/api/bills/:billOwnerId', checkAuth, bills.findAllByIdOwner);

  // Update a User with Id
  app.put('/api/bills/:billId', bills.update);

  // Delete a User with Id
  app.delete('/api/bills/:billId', bills.delete);
};
