/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import SettingsPage from 'containers/SettingsPage';
import PaymentPage from 'containers/PaymentPage';
import RegisterPage from 'containers/RegisterPage';
import LoginPage from 'containers/LoginPage';
import HomePage from 'containers/HomePage';
import DashboardPage from 'containers/DashboardPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
      <GlobalStyle />
    </div>
  );
}
