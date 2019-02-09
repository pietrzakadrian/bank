/* eslint func-names: ["error", "never"] */
module.exports = function(app) {
  const additionals = require('../controllers/additional.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');

  app.get(
    '/api/additional/notification/:userId',
    checkAuth,
    checkToken,
    additionals.isNotification,
  );

  // Confirm a new Transactions
  app.put(
    '/api/additional/notification/:userId',
    checkAuth,
    checkToken,
    additionals.setNotification,
  );
};
