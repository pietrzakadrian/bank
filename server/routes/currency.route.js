module.exports = function(app) {
  const currency = require('../controllers/currency.controller.js');
  const basicAuth = require('../middlewares/basicAuth.middleware.js');

  // get Currency Action
  app.get('/api/currency', currency.getCurrency);

  // set Currency Cron
  app.post('/api/currency', basicAuth, currency.setCurrency);
};
