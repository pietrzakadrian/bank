import decode from 'jwt-decode';

export default class AuthService {
  constructor(domain) {
    this.domain = domain || 'http://192.168.1.2:3000/api';
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getUserdata = this.getUserdata.bind(this);
  }

  // Check Login Exist Action
  checkLoginExist(id) {
    return this.fetch(`${this.domain}/users/${id}`, {
      method: 'GET',
    })
      .then(res => {
        if (res) {
          return 1;
        }
      })
      .catch(err => {
        /* just ignore */
      });
  }

  // Login Action
  login(login, password) {
    return this.fetch(`${this.domain}/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then(res => {
        if (res.token) {
          this.setToken(res.token);
          return 1;
        }
      })
      .catch(err => {
        /* just ignore */
      });
  }

  // Register Action
  register(login, password, name, surname, email) {
    return this.fetch(`${this.domain}/users/register`, {
      method: 'POST',
      body: JSON.stringify({
        login,
        password,
        name,
        surname,
        email,
      }),
    })
      .then(res => {
        if (!res.error) {
          return 1;
        }
      })
      .catch(err => {
        /* just ignore */
      });
  }

  updateLastSuccessfulLoggedDate(id) {
    return this.fetch(`${this.domain}/users/logout/${id}`, {
      method: 'PUT',
    })
      .then(res => {
        if (!res.error) {
          return 1;
        }
      })
      .catch(err => {
        /* just ignore */
      });
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  // AvailableFunds Action
  availableFunds(id) {
    return this.fetch(`${this.domain}/bills/${id}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.error) {
          return res;
        }
      })
      .catch(err => {
        /* just ignore */
      });
  }

  // GreetingHeadline Action
  greetingHeadline(id) {
    return this.fetch(`${this.domain}/user/${id}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.error) {
          return res;
        }
      })
      .catch(err => {
        /* just ignore */
      });
  }

  // AccountBills Action
  accountBills(id) {
    return this.fetch(`${this.domain}/bills/${id}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.error) {
          return res;
        }
      })
      .catch(err => {
        /* just ignore */
      });
  }

  // RecentTransactions Action
  recentTransactionsRecipient(id) {
    return this.fetch(`${this.domain}/transactions/recipient/${id}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.error) {
          return res;
        }
      })
      .catch(err => {
        /* just ignore */
      });
  }

  recentTransactionsSender(id) {
    return this.fetch(`${this.domain}/transactions/sender/${id}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.error) {
          return res;
        }
      })
      .catch(err => {
        /* just ignore */
      });
  }

  // Payment Action
  makePayment(id_sender, account_bill, amount_money, transfer_title) {
    return this.fetch(`${this.domain}/transactions`, {
      method: 'POST',
      body: JSON.stringify({
        id_sender,
        account_bill,
        amount_money,
        transfer_title,
      }),
    });
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
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  getUserdata() {
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

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
