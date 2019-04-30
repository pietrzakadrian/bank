import decode from 'jwt-decode';

export default class AuthService {
  constructor() {
    this.setToken = this.setToken.bind(this);
    this.unsetToken = this.unsetToken.bind(this);
    this.getToken = this.getToken.bind(this);
    this.isRegister = this.isRegister.bind(this);
    this.unsetRegister = this.unsetRegister.bind(this);
    this.getUsersData = this.getUsersData.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.isTokenExpired = this.isTokenExpired.bind(this);
    this.getUserId = this.getUserId.bind(this);
  }

  isRegister() {
    return sessionStorage.getItem('register');
  }

  unsetRegister() {
    return sessionStorage.removeItem('register');
  }

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
}
