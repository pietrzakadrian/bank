/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import AuthService from 'services/AuthService';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/dashboard');
    else this.props.history.replace('/login');
  }

  render() {
    return <Fragment />;
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(HomePage);
