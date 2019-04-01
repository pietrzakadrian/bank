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
import PaymentPage from 'containers/PaymentPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import HistoryPage from 'containers/HistoryPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import Components
import Header from 'components/App/Header';

// Import Global Styles
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/404" component={NotFoundPage} />
        <Header>
          <Switch>
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/history" component={HistoryPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route render={() => <Redirect to="/404" />} />
          </Switch>
        </Header>
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
}
