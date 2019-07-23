/* eslint-disable no-underscore-dangle */
const BASE_URL = 'http://localhost:8000';
const AUTH_PATH = '/api/auth';
const USERS_PATH = '/api/users';
const BILLS_PATH = '/api/bills';
const TRANSACTIONS_PATH = '/api/transactions';
const CURRENCY_PATH = '/api/currency';
const ADDITIONALS_PATH = '/api/additionals';

const api = {
  _login: '',
  _email: '',
  _accountBill: '',
  _amountMoney: '',
  _id: '',
  _offset: '',
  _limit: '',

  get loginPath() {
    return `${BASE_URL}${AUTH_PATH}/login`;
  },

  get registerPath() {
    return `${BASE_URL}${AUTH_PATH}/register`;
  },

  get logoutPath() {
    return `${BASE_URL}${AUTH_PATH}/logout`;
  },

  get usersPath() {
    return `${BASE_URL}${USERS_PATH}`;
  },

  set login(login) {
    this._login = login;
  },

  get isLoginPath() {
    return `${BASE_URL}${USERS_PATH}/${this._login}/isLogin`;
  },

  set email(email) {
    this._email = email;
  },

  get isEmailPath() {
    return `${BASE_URL}${USERS_PATH}/${this._email}/isEmail`;
  },

  get billsPath() {
    return `${BASE_URL}${BILLS_PATH}`;
  },

  set accountBill(accountBill) {
    this._accountBill = accountBill;
  },

  get searchPath() {
    return `${BASE_URL}${BILLS_PATH}/${this._accountBill}/search`;
  },

  get isAccountBillPath() {
    return `${BASE_URL}${BILLS_PATH}/${this._accountBill}/isAccountBill`;
  },

  set amountMoney(amountMoney) {
    this._amountMoney = amountMoney;
  },

  get isAmountMoneyPath() {
    return `${BASE_URL}${BILLS_PATH}/${this._amountMoney}/isAmountMoney`;
  },

  set limit(limit) {
    this._limit = limit;
  },

  get transactionsPath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/${this._limit && this._limit}`;
  },

  get confirmPath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/confirm`;
  },

  get createPath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/create`;
  },

  get recipientPath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/recipient`;
  },

  get senderPath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/sender`;
  },

  set id(id) {
    this._id = id;
  },

  get authorizationKeyPath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/${this._id}/key`;
  },

  get currencyPath() {
    return `${BASE_URL}${CURRENCY_PATH}`;
  },

  set offset(offset) {
    this._offset = offset;
  },

  get notificationsPath() {
    return `${BASE_URL}${ADDITIONALS_PATH}/notifications/${this._offset &&
      this._offset}`;
  },

  get isNotificationPath() {
    return `${BASE_URL}${ADDITIONALS_PATH}/notifications/isNotification`;
  },
};

module.exports = api;
