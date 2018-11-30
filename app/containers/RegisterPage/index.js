/*
 * Dashboard
 *
 * This is the first page thing users see of our App after logging in, at the '/login' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export default class RegisterPage extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet title="Register" />
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </Fragment>
    );
  }
}
