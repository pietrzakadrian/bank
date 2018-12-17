import React, { Component } from 'react';
import './Register.css';
import { register } from '../../services/UserService';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
      name: '',
      surname: '',
      address: '',
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
      name: this.state.name,
      surname: this.state.surname,
      address: this.state.address,
    };

    register(user).then(res => {
      if (res) {
        this.props.history.push(`/login`);
      }
    });
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Register</h1>
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
            <input className="form-submit" value="SUBMIT" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
