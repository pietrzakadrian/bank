module.exports = function(app) {
  const users = require('../controllers/user.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');
  const promotion = require('../middlewares/promotion.middleware.js');
  const { check } = require('express-validator/check');

  // Register Action
  app.post(
    '/api/users/register',
    [
      check('login')
        .isInt()
        .exists(),
      check('password').exists(),
      check('name')
        .exists()
        .isString(),
      check('surname')
        .exists()
        .isString(),
      check('email')
        .exists()
        .isEmail(),
    ],
    users.register,
  );

  // Login Action
  app.post(
    '/api/users/login',
    [
      check('login')
        .isInt()
        .exists(),
      check('password').exists(),
    ],
    promotion,
    users.login,
  );

  // Update Last Logged Data Action
  app.put(
    '/api/users/logout/:userId',
    checkAuth,
    checkToken,
    [
      check('userId')
        .isInt()
        .exists(),
    ],
    users.logout,
  );

  // Check Login User Exist Action
  app.get(
    '/api/users/isLogin/:userLogin?',
    [
      check('userLogin')
        .isInt()
        .exists(),
    ],
    users.isLogin,
  );

  // Check Email User Exist Action
  app.get(
    '/api/users/isEmail/:userEmail?',
    [
      check('userEmail')
        .isEmail()
        .exists(),
    ],
    users.isEmail,
  );

  // Return basic User's Data Action
  app.get(
    '/api/users/:userId',
    checkAuth,
    checkToken,
    [
      check('userId')
        .isInt()
        .exists(),
    ],
    users.getUserdata,
  );

  // Update basic User's Data Action
  app.put(
    '/api/users/:userId',
    checkAuth,
    checkToken,
    [
      check('userId')
        .isInt()
        .exists(),
    ],
    users.setUserdata,
  );

  // Update User's Currency Action
  app.put(
    '/api/users/setCurrency/:userId',
    checkAuth,
    checkToken,
    [
      check('userId')
        .isInt()
        .exists(),
      check('currencyId')
        .isInt()
        .exists(),
    ],
    users.setCurrency,
  );
};
