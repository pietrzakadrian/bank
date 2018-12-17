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

import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// Import Components
import LoadingCircual from '../../components/LoadingCircular';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentWillMount() {
    if (localStorage.getItem('userToken')) {
      this.props.history.replace('/dashboard');
    } else {
      this.props.history.replace('/login');
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <Fragment>
        {loading ? (
          <div className="loadingHomePage">
            <LoadingCircual className="loadingHomePageComponent" />
          </div>
        ) : (
          <FormattedMessage {...messages.header} />
        )}
      </Fragment>
    );
  }
}

export default withRouter(HomePage);
