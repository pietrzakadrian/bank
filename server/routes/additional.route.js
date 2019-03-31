/* eslint func-names: ["error", "never"] */
module.exports = function (app) {
  const additionals = require('../controllers/additional.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');

  app.get(
    '/api/additionals/isNotification/:userId',
    checkAuth,
    checkToken,
    additionals.isNotification
  );

  // Confirm a new Transactions
  app.put(
    '/api/additionals/setNotification/:userId',
    checkAuth,
    checkToken,
    additionals.setNotification
  );

  // Confirm a new Transactions
  app.put(
    '/api/additionals/unsetNotification/:userId',
    checkAuth,
    checkToken,
    additionals.unsetNotification
  );
};
