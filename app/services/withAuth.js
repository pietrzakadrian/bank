import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService('http://localhost:3000/api');
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
      };
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile,
          });
        } catch (err) {
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }

    handleLogout() {
      Auth.logout();
      this.props.history.replace('/login');
    }

    render() {
      if (this.state.user) {
        return (
          <button
            type="button"
            className="form-submit"
            onClick={this.handleLogout.bind(this)}
          >
            Logout
          </button>
        );
      }
      return null;
    }
  };
}
