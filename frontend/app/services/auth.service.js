import decode from 'jwt-decode';

export default class AuthService {
  loggedIn = () => {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired = (token) => {
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

  setToken = (idToken) => {
    return localStorage.setItem('token', idToken);
  }

  unsetToken = () => {
    return localStorage.removeItem('token');
  }

  getToken = () => {
    return localStorage.getItem('token');
  }

  getUserId = () => {
    const token = decode(this.getToken());
    return token.id;
  }
}
