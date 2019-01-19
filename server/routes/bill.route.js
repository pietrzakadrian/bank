module.exports = function(app) {
  const bills = require('../controllers/bill.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');

  // Return User's Bill Data
  app.get('/api/bills/:userId', checkAuth, bills.getUserdata);
};
