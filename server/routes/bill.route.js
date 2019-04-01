/* eslint func-names: ["error", "never"] */
module.exports = function(app) {
  const bills = require('../controllers/bill.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');

  // Return User's Bill Data Action
  app.get('/api/bills/:userId', checkAuth, checkToken, bills.getUserdata);

  // Return All User's Bill Data Action
  app.get('/api/bills/search/:accountBill?', checkAuth, bills.getUsersdata);

  // Check User's Bill Exist Action
  app.get(
    '/api/bills/isAccountBill/:accountBill?',
    checkAuth,
    bills.isAccountBill,
  );

  // Check User's Amount Money currently Action
  app.post(
    '/api/bills/isAmountMoney',
    checkAuth,
    checkToken,
    bills.isAmountMoney,
  );
};
