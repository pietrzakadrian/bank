module.exports = function(app) {
  const bills = require('../controllers/bill.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');

  // Return All User's Bill Data
  app.get('/api/bills', checkAuth, bills.getUsersdata);

  // Return User's Bill Data
  app.get('/api/bills/:userId', checkAuth, bills.getUserdata);

  // Check User's Bill Exist
  app.get(
    '/api/bills/isAccountBill/:accountBill',
    checkAuth,
    bills.isAccountBill,
  );

  // Check User's Amount Money currently
  app.post('/api/bills/isAmountMoney', checkAuth, bills.isAmountMoney);
};
