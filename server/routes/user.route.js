module.exports = function(app) {
  const users = require('../controllers/user.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');

  // Create a new User
  app.post('/api/users/register', users.create);

  // Login User
  app.post('/api/users/login', users.login);

  // GreetingHeadline User
  app.get('/api/user/:userId', checkAuth, users.findById);

  // // Update Last Logged Data
  // app.put('/api/users/logout/:userId', checkAuth, users.updateLastLoggedDate);

  // Retrieve a single User by Login
  app.get('/api/users/:userLogin', users.findByLogin);

  // Update a User with Id
  app.put('/api/users/:userId', users.update);

  // Delete a User with Id
  app.delete('/api/users/:userLogin', users.delete);

  // // Retrieve all User
  // app.get('/api/users', users.findAll);
};
