/* eslint func-names: ["error", "never"] */
module.exports = function(app) {
  const additionals = require('../controllers/additional.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');

  app.get(
    '/api/additionals/isNotification/:userId',
    checkAuth,
    checkToken,
    additionals.isNotification,
  );

  app.post(
    '/api/additionals/newNotification/',
    checkAuth,
    checkToken,
    additionals.newNotification,
  );

  app.put(
    '/api/additionals/unsetNotification/:userId',
    checkAuth,
    checkToken,
    additionals.unsetNotification,
  );
};
