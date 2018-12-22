import React, { Component } from 'react';
import './Login.css';
import AuthService from '../../services/AuthService';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
      error: '',
    };

    this.goToRegister = this.goToRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/dashboard');
  }

  goToRegister() {
    this.props.history.replace('/register');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.login, this.state.password)
      .then(res => {
        if (res) {
          this.props.history.replace('/dashboard');
        } else {
          this.setState({
            error: 'Error',
          });
        }
      })
      .catch(err => {
        this.setState({
          error: 'Error catch',
        });
      });
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form noValidate onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="login"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            {this.state.error}
            <input className="form-submit" value="SUBMIT" type="submit" />
          </form>
          <div onClick={this.goToRegister}>Register</div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
