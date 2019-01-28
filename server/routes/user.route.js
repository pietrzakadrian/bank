module.exports = function(app) {
  const users = require('../controllers/user.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');

  // Register Action
  app.post('/api/users/register', users.register);

  // Login Action
  app.post('/api/users/login', users.login);

  // Update Last Logged Data
  app.put('/api/users/logout/:userId', checkAuth, checkToken, users.logout);

  // Check Login User Exist
  app.get('/api/users/isLogin/:userLogin', users.isLogin);

  // Check Email User Exist
  app.get('/api/users/isEmail/:userEmail', users.isEmail);

  // Return basic User's Data
  app.get('/api/users/:userId', checkAuth, checkToken, users.getUserdata);

  // Update basic User's Data
  app.put('/api/users/:userId', checkAuth, checkToken, users.setUserdata);
};
