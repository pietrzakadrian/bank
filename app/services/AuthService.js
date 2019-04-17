import decode from 'jwt-decode';

export default class AuthService {
  constructor(domain) {
    this.domain = domain || '/api';
    this.fetch = this.fetch.bind(this);
    this.isRegister = this.isRegister.bind(this);
    this.unsetRegister = this.unsetRegister.bind(this);
    this.registerTransaction = this.registerTransaction.bind(this);
    this.confirmTransaction = this.confirmTransaction.bind(this);
    this.getUsersData = this.getUsersData.bind(this);
  }

  // Payment Action
  registerTransaction(id_sender, account_bill, amount_money, transfer_title) {
    return this.fetch(`${this.domain}/transactions/register`, {
      method: 'POST',
      body: JSON.stringify({
        id_sender,
        account_bill,
        amount_money,
        transfer_title,
      }),
    });
  }

  confirmTransaction(
    id_sender,
    account_bill,
    amount_money,
    transfer_title,
    authorization_key,
  ) {
    return this.fetch(`${this.domain}/transactions`, {
      method: 'POST',
      body: JSON.stringify({
        id_sender,
        account_bill,
        amount_money,
        transfer_title,
        authorization_key,
      }),
    });
  }

  getUsersData(partOfAccountBill) {
    return this.fetch(`${this.domain}/bills/search/${partOfAccountBill}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.error) {
          return res;
        }
      })
      .catch(() => {
        /* just ignore */
      });
  }

  isRegister() {
    return sessionStorage.getItem('register');
  }

  unsetRegister() {
    return sessionStorage.removeItem('register');
  }

  // TODO: updateLastSuccessfulLoggedDate(id) when isTokenExpired
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    return localStorage.setItem('id_token', idToken);
  }

  unsetToken() {
    // Delete the user token from localStorage
    return localStorage.removeItem('id_token');
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  getUserId() {
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.loggedIn()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this.checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
