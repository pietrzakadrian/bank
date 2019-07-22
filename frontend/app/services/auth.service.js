import decode from 'jwt-decode';

export default class AuthService {
  constructor() {
    this.loggedIn = this.loggedIn.bind(this);
    this.isTokenExpired = this.isTokenExpired.bind(this);
    this.setToken = this.setToken.bind(this);
    this.unsetToken = this.unsetToken.bind(this);
    this.getToken = this.getToken.bind(this);
    this.getUserId = this.getUserId.bind(this);
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
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
    return localStorage.setItem('token', idToken);
  }

  unsetToken() {
    return localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    const token = decode(this.getToken());
    console.log(token.id)
    return token.id;
  }
}
