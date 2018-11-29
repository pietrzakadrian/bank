/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';

import SettingsPage from 'containers/SettingsPage';
import PaymentPage from 'containers/PaymentPage';
import RegisterPage from 'containers/RegisterPage';
import LoginPage from 'containers/LoginPage';
import HomePage from 'containers/HomePage';
import DashboardPage from 'containers/DashboardPage';
import NotFoundPage from 'containers/NotFoundPage';

import GlobalStyle from '../../global-styles';
import Header from '../../components/Header';

export default function App(props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Header} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />

          <Header>
            <Switch>
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/payment" component={PaymentPage} />
              <Route path="/settings" component={SettingsPage} />
              <Route exact path="/404" component={NotFoundPage} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </Header>
        </Switch>
      </Router>
      <GlobalStyle />
    </div>
  );
}
