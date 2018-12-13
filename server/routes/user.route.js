module.exports = function(app) {
  const users = require('../controllers/user.controller.js');

  // Create a new User
  app.post('/api/users/register', users.create);

  app.post('/api/users/login', users.findOne);

  // Retrieve a single User by Id
  app.get('/api/users/:userId', users.findById);

  // Update a User with Id
  app.put('/api/users/:userId', users.update);

  // Delete a User with Id
  app.delete('/api/users/:userLogin', users.delete);

  // // Retrieve all User
  // app.get('/api/users', users.findAll);
};
