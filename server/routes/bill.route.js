/* eslint func-names: ["error", "never"] */
module.exports = function(app) {
  const bills = require('../controllers/bill.controller.js');
  const checkAuth = require('../middlewares/checkAuth.middleware.js');
  const checkToken = require('../middlewares/checkToken.middleware.js');
  const { check } = require('express-validator/check');

  // Return User's Bill Data Action
  app.get(
    '/api/bills/:userId',
    checkAuth,
    checkToken,
    [
      check('userId')
        .isInt()
        .exists(),
    ],
    bills.getUserdata,
  );

  // Return All User's Bill Data Action
  app.get(
    '/api/bills/search/:accountBill?',
    checkAuth,
    [
      check('accountBill')
        .isDecimal()
        .isLength({ max: 26 })
        .exists(),
    ],
    bills.getUsersdata,
  );

  // Check User's Bill Exist Action
  app.get(
    '/api/bills/isAccountBill/:accountBill?',
    checkAuth,
    [
      check('accountBill')
        .isDecimal()
        .isLength({ min: 26, max: 26 })
        .exists(),
    ],
    bills.isAccountBill,
  );

  // Check User's Amount Money currently Action
  app.post(
    '/api/bills/isAmountMoney',
    checkAuth,
    checkToken,
    [
      check('id_sender')
        .isInt()
        .exists(),
      check('amount_money')
        .isNumeric()
        .exists(),
    ],
    bills.isAmountMoney,
  );
};
