module.exports = function(app) {
  const users = require('../controllers/user.controller.js');

  // Create a new User
  app.post('/api/users', users.create);

  // Retrieve all User
  app.get('/api/users', users.findAll);

  // Retrieve a single User by Id
  app.get('/api/customers/:userId', users.findById);

  // Update a User with Id
  app.put('/api/customers/:userId', users.update);

  // Delete a User with Id
  app.delete('/api/customers/:userId', users.delete);
};
