const api = {
  baseURL: 'https://bank.pietrzakadrian.com',
  users: {
    userPath: '/api/users/',
    registerPath: '/api/users/register/',
    loginPath: '/api/users/login/',
    logoutPath: '/api/users/logout/',
    isLoginPath: '/api/users/isLogin/',
    isEmailPath: '/api/users/isEmail/',
    setCurrencyPath: '/api/users/setCurrency/',
  },
  bills: {
    billsPath: '/api/bills/',
    searchPath: '/api/bills/search/',
    isAccountBillPath: '/api/bills/isAccountBill/',
    isAmountMoneyPath: '/api/bills/isAmountMoney/',
  },
  transactions: {
    confirmPath: '/api/transactions/confirm/',
    registerPath: '/api/transactions/register/',
    getTransactionsPath: '/api/transactions/getTransactions/',
    recipientPath: '/api/transactions/recipient/',
    senderPath: '/api/transactions/sender/',
    authorizationKeyPath: '/api/transactions/authorizationKey/',
  },
  currency: {
    currencyPath: '/api/currency/',
  },
  additionals: {
    isNotificationPath: '/api/additionals/isNotification/',
    newNotificationPath: '/api/additionals/newNotification/',
    unsetNotificationPath: '/api/additionals/unsetNotification/',
  },
};

module.exports = api;
