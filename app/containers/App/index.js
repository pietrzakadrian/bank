/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Import Containers
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import PrivacyPage from 'containers/PrivacyPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import Components
import Header from 'components/App/Header';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/404" component={NotFoundPage} />
        <Header>
          <Switch>
            <Route path="/dashboard" component={DashboardPage} />
            <Route render={() => <Redirect to="/404" />} />
          </Switch>
        </Header>
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
}
