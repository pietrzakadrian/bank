/* eslint-disable no-underscore-dangle */

const api = {
  BASE_URL: 'http://localhost:8000',
  AUTH_PATH: '/api/auth/',
  USERS_PATH: '/api/users',
  BILLS_PATH: '/api/bills',
  TRANSACTIONS_PATH: '/api/transactions',
  CURRENCY_PATH: '/api/currency',
  ADDITIONALS_PATH: '/api/additionals',
  _login: undefined,
  _email: undefined,
  _accountBill: undefined,
  _amountMoney: undefined,
  _id: undefined,
  _offset: undefined,
  _limit: undefined,

  get loginPath() {
    return `${this.BASE_URL}${this.AUTH_PATH}/login`;
  },

  get registerPath() {
    return `${this.BASE_URL}${this.AUTH_PATH}/register`;
  },

  get logoutPath() {
    return `${this.BASE_URL}${this.AUTH_PATH}/logout`;
  },

  get usersPath() {
    return `${this.BASE_URL}${this.USERS_PATH}`;
  },

  set login(login) {
    this._login = login;
  },

  get isLoginPath() {
    return `${this.BASE_URL}${this.USERS_PATH}/${this._login}/isLogin`;
  },

  set email(email) {
    this._email = email;
  },

  get isEmailPath() {
    return `${this.BASE_URL}${this.USERS_PATH}/${this._email}/isEmail`;
  },

  get billsPath() {
    return `${this.BASE_URL}${this.BILLS_PATH}`;
  },

  set accountBill(accountBill) {
    this._accountBill = accountBill;
  },

  get searchPath() {
    return `${this.BASE_URL}${this.BILLS_PATH}/${this._accountBill}/search`;
  },

  get isAccountBillPath() {
    return `${this.BASE_URL}${this.BILLS_PATH}/${this._accountBill}/isAccountBill`;
  },

  set amountMoney(amountMoney) {
    this._amountMoney = amountMoney;
  },

  get isAmountMoneyPath() {
    return `${this.BASE_URL}${this.BILLS_PATH}/${this._amountMoney}/isAmountMoney`;
  },

  set limit(limit) {
    this._limit = limit;
  },

  get transactionsPath() {
    return `${this.BASE_URL}${this.TRANSACTIONS_PATH}/${this._limit &&
      this._limit}`;
  },

  get confirmPath() {
    return `${this.BASE_URL}${this.TRANSACTIONS_PATH}/confirm`;
  },

  get createPath() {
    return `${this.BASE_URL}${this.TRANSACTIONS_PATH}/create`;
  },

  get recipientPath() {
    return `${this.BASE_URL}${this.TRANSACTIONS_PATH}/recipient`;
  },

  get senderPath() {
    return `${this.BASE_URL}${this.TRANSACTIONS_PATH}/sender`;
  },

  set id(id) {
    this._id = id;
  },

  get authorizationKeyPath() {
    return `${this.BASE_URL}${this.TRANSACTIONS_PATH}/${this._id}/key`;
  },

  get currencyPath() {
    return `${this.BASE_URL}${this.CURRENCY_PATH}`;
  },

  set offset(offset) {
    this._offset = offset;
  },

  get notificationsPath() {
    return `${this.BASE_URL}${this.ADDITIONALS_PATH}/notifications${this
      ._offset && this._offset}`;
  },

  get isNotificationPath() {
    return `${this.BASE_URL}${this.ADDITIONALS_PATH}/notifications/isNotification`;
  },
};

module.exports = api;
