module.exports = function(app) {
  const currency = require('../controllers/currency.controller.js');

  // Currency List Action
  app.get('/api/currency/', currency.getCurrency);
};
