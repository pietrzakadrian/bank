/* eslint func-names: ["error", "never"] */
module.exports = function(app) {
  const additionals = require('../controllers/additional.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');
  const { check } = require('express-validator/check');

  app.get(
    '/api/additionals/isNotification/:userId',
    checkAuth,
    checkToken,
    [
      check('userId')
        .isInt()
        .exists(),
    ],
    additionals.isNotification,
  );

  app.post(
    '/api/additionals/newNotification/',
    checkAuth,
    checkToken,
    [
      check('userId')
        .isInt()
        .exists(),
      check('notificationCount')
        .isInt()
        .exists(),
    ],
    additionals.newNotification,
  );

  app.put(
    '/api/additionals/unsetNotification/:userId',
    checkAuth,
    checkToken,
    [
      check('userId')
        .isInt()
        .exists(),
    ],
    additionals.unsetNotification,
  );
};
