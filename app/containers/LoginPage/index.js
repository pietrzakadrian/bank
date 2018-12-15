/*
 * LoginPage
 *
 * This is the first page thing users see of our App after logging in, at the '/login' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, Fragment } from 'react';
import './Login.css';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import messages from './messages';

class LoginPage extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <Fragment>
        <Helmet title="Login - Bank Application" />

        <div className="center">
          <div className="card">
            <h1>
              <FormattedMessage {...messages.header} />
            </h1>
            <form>
              <input
                className="form-item"
                placeholder="Username goes here..."
                name="username"
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
              <input className="form-submit" value="SUBMIT" type="submit" />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
}
export default LoginPage;
