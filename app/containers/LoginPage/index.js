import React, { Component } from 'react';
import './Login.css';
import { login } from '../../services/UserService';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      login: this.state.login,
      password: this.state.password,
    };

    login(user).then(res => {
      if (!res.error) {
        this.props.history.push(`/dashboard`);
      } else {
        this.setState({ error: res.error });
      }
    });
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form noValidate onSubmit={this.onSubmit}>
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
            <div
              className="alert alert-danger"
              style={{
                visibility: this.state.error !== '' ? 'visible' : 'hidden',
              }}
            >
              {this.state.error}
            </div>
            <input className="form-submit" value="SUBMIT" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
