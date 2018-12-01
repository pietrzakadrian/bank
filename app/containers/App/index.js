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
  Redirect,
} from 'react-router-dom';

// Import Containers
import SettingsPage from 'containers/SettingsPage/Loadable';
import PaymentPage from 'containers/PaymentPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import Components
import Header from '../../components/Header';

// Import Styles
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/404" component={NotFoundPage} />
          <Header>
            <Switch>
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/payment" component={PaymentPage} />
              <Route path="/settings" component={SettingsPage} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </Header>
        </Switch>
      </Router>
      <GlobalStyle />
    </div>
  );
}
