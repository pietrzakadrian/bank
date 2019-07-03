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
import { useInjectSaga } from 'utils/injectSaga';

// Import Containers
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import PrivacyPage from 'containers/PrivacyPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import PaymentPage from 'containers/PaymentPage/Loadable';
import HistoryPage from 'containers/HistoryPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import Components
import Header from 'components/App/Header';
import saga from './saga';
import GlobalStyle from '../../global-styles';

export default function App() {
  useInjectSaga({ key: 'appPage', saga });

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
