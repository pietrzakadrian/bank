import React, { Component } from 'react';
import './Register.css';
import AuthService from '../../services/AuthService';

class RegisterPage extends Component {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
      name: '',
      surname: '',
      address: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/dashboard');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.register(
      this.state.login,
      this.state.password,
      this.state.name,
      this.state.surname,
      this.state.address,
    )
      .then(res => {
        if (res) {
          this.props.history.replace('/login');
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
          <h1>Register</h1>
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
            <input
              className="form-item"
              placeholder="Name goes here..."
              name="name"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Surname goes here..."
              name="surname"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Address goes here..."
              name="address"
              type="text"
              onChange={this.handleChange}
            />
            {this.state.error}
            <input className="form-submit" value="SUBMIT" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
