const BASE_URL = 'http://127.0.0.1:8000';
const AUTH_PATH = '/api/auth';
const USERS_PATH = '/api/users';
const BILLS_PATH = '/api/bills';
const TRANSACTIONS_PATH = '/api/transactions';
const CURRENCY_PATH = '/api/currency';
const ADDITIONALS_PATH = '/api/additionals';

export default class ApiEndpoint {
  getBasePath = () => {
    return `${BASE_URL}`;
  };

  getLoginPath = () => {
    return `${BASE_URL}${AUTH_PATH}/login`;
  };

  getRegisterPath = () => {
    return `${BASE_URL}${AUTH_PATH}/register`;
  };

  getLogoutPath = () => {
    return `${BASE_URL}${AUTH_PATH}/logout`;
  };

  getUsersPath = () => {
    return `${BASE_URL}${USERS_PATH}`;
  };

  getIsLoginPath = login => {
    return `${BASE_URL}${USERS_PATH}/${login}/isLogin`;
  };

  getIsEmailPath = email => {
    return `${BASE_URL}${USERS_PATH}/${email}/isEmail`;
  };

  getBillsPath = () => {
    return `${BASE_URL}${BILLS_PATH}`;
  };

  getSearchPath = accountBill => {
    return `${BASE_URL}${BILLS_PATH}/${accountBill}/search`;
  };

  getIsAccountBillPath = accountBill => {
    return `${BASE_URL}${BILLS_PATH}/${accountBill}/isAccountBill`;
  };

  getIsAmountMoneyPath = amountMoney => {
    return `${BASE_URL}${BILLS_PATH}/${amountMoney}/isAmountMoney`;
  };

  getTransactionsPath = (limit = '') => {
    return `${BASE_URL}${TRANSACTIONS_PATH}/${limit}`;
  };

  getConfirmPath = () => {
    return `${BASE_URL}${TRANSACTIONS_PATH}/confirm`;
  };

  getCreatePath = () => {
    return `${BASE_URL}${TRANSACTIONS_PATH}/create`;
  };

  getRecipientPath = () => {
    return `${BASE_URL}${TRANSACTIONS_PATH}/recipient`;
  };

  getSenderPath = () => {
    return `${BASE_URL}${TRANSACTIONS_PATH}/sender`;
  };

  getAuthorizationKeyPath = id => {
    return `${BASE_URL}${TRANSACTIONS_PATH}/${id}/key`;
  };

  getCurrencyPath = () => {
    return `${BASE_URL}${CURRENCY_PATH}`;
  };

  getNotificationsPath = (offset = '') => {
    return `${BASE_URL}${ADDITIONALS_PATH}/notifications/${offset}`;
  };

  getIsNotificationPath = () => {
    return `${BASE_URL}${ADDITIONALS_PATH}/notifications/isNotification`;
  };

  getMessagesPath = (language = '') => {
    return `${BASE_URL}${ADDITIONALS_PATH}/messages/${language}`;
  };

  getIsMessagePath = () => {
    return `${BASE_URL}${ADDITIONALS_PATH}/messages/isMessage`;
  };
}
