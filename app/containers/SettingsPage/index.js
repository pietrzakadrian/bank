/*
 * SettingsPage
 *
 * This is the first page thing users see of our App after logging in, at the '/login' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import messages from './messages';

class SettingsPage extends Component {
  render() {
    return (
      <Fragment>
        <Helmet title="Settings - Bank Application" />
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </Fragment>
    );
  }
}

export default SettingsPage;
