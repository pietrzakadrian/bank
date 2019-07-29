const BASE_URL = 'http://localhost:8000';
const AUTH_PATH = '/api/auth';
const USERS_PATH = '/api/users';
const BILLS_PATH = '/api/bills';
const TRANSACTIONS_PATH = '/api/transactions';
const CURRENCY_PATH = '/api/currency';
const ADDITIONALS_PATH = '/api/additionals';

export default class ApiEndpoint {
  constructor() {
    this.getLoginPath = this.getLoginPath.bind(this);
    this.getRegisterPath = this.getRegisterPath.bind(this);
    this.getLogoutPath = this.getLogoutPath.bind(this);
    this.getUsersPath = this.getUsersPath.bind(this);
    this.getIsLoginPath = this.getIsLoginPath.bind(this);
    this.getIsEmailPath = this.getIsEmailPath.bind(this);
    this.getBillsPath = this.getBillsPath.bind(this);
    this.getSearchPath = this.getSearchPath.bind(this);
    this.getIsAccountBillPath = this.getIsAccountBillPath.bind(this);
    this.getIsAmountMoneyPath = this.getIsAmountMoneyPath.bind(this);
    this.getTransactionsPath = this.getTransactionsPath.bind(this);
    this.getConfirmPath = this.getConfirmPath.bind(this);
    this.getCreatePath = this.getCreatePath.bind(this);
    this.getRecipientPath = this.getRecipientPath.bind(this);
    this.getSenderPath = this.getSenderPath.bind(this);
    this.getAuthorizationKeyPath = this.getAuthorizationKeyPath.bind(this);
    this.getCurrencyPath = this.getCurrencyPath.bind(this);
    this.getNotificationsPath = this.getNotificationsPath.bind(this);
    this.getMessagesPath = this.getMessagesPath.bind(this);
    this.getIsNotificationPath = this.getIsNotificationPath.bind(this);
    this.getIsMessagePath = this.getIsMessagePath.bind(this);
  }

  getLoginPath() {
    return `${BASE_URL}${AUTH_PATH}/login`;
  }

  getRegisterPath() {
    return `${BASE_URL}${AUTH_PATH}/register`;
  }

  getLogoutPath() {
    return `${BASE_URL}${AUTH_PATH}/logout`;
  }

  getUsersPath() {
    return `${BASE_URL}${USERS_PATH}`;
  }

  getIsLoginPath(login) {
    return `${BASE_URL}${USERS_PATH}/${login}/isLogin`;
  }

  getIsEmailPath(email) {
    return `${BASE_URL}${USERS_PATH}/${email}/isEmail`;
  }

  getBillsPath() {
    return `${BASE_URL}${BILLS_PATH}`;
  }

  getSearchPath(accountBill) {
    return `${BASE_URL}${BILLS_PATH}/${accountBill}/search`;
  }

  getIsAccountBillPath(accountBill) {
    return `${BASE_URL}${BILLS_PATH}/${accountBill}/isAccountBill`;
  }

  getIsAmountMoneyPath(amountMoney) {
    return `${BASE_URL}${BILLS_PATH}/${amountMoney}/isAmountMoney`;
  }

  getTransactionsPath(limit = '') {
    return `${BASE_URL}${TRANSACTIONS_PATH}/${limit}`;
  }

  getConfirmPath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/confirm`;
  }

  getCreatePath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/create`;
  }

  getRecipientPath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/recipient`;
  }

  getSenderPath() {
    return `${BASE_URL}${TRANSACTIONS_PATH}/sender`;
  }

  getAuthorizationKeyPath(id) {
    return `${BASE_URL}${TRANSACTIONS_PATH}/${id}/key`;
  }

  getCurrencyPath() {
    return `${BASE_URL}${CURRENCY_PATH}`;
  }

  getNotificationsPath(offset = '') {
    return `${BASE_URL}${ADDITIONALS_PATH}/notifications/${offset}`;
  }

  getIsNotificationPath() {
    return `${BASE_URL}${ADDITIONALS_PATH}/notifications/isNotification`;
  }

  getMessagesPath() {
    return `${BASE_URL}${ADDITIONALS_PATH}/messages`;
  }

  getIsMessagePath() {
    return `${BASE_URL}${ADDITIONALS_PATH}/messages/isMessage`;
  }
}
