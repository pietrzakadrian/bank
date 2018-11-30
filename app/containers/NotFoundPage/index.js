/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
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
export default class NotFoundPage extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet title="Not Found Page" />
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </Fragment>
    );
  }
}
