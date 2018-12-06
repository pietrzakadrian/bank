module.exports = function(app) {
  const bills = require('../controllers/bill.controller.js');

  // Create a new User
  app.post('/api/bills', bills.create);

  // Retrieve all User
  app.get('/api/bills', bills.findAll);

  // Retrieve a single User by Id
  app.get('/api/bills/:billId', bills.findById);

  // Update a User with Id
  app.put('/api/bills/:billId', bills.update);

  // Delete a User with Id
  app.delete('/api/bills/:billId', bills.delete);
};
