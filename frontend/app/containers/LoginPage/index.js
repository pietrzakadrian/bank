/**
 *
 * LoginPage
 *
 */

import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Information from 'components/Information';
import Footer from 'components/Footer';
import LoginForm from 'components/LoginForm';

import messages from './messages';

// Import Actions
import { isLoggedAction } from './actions';

const key = 'loginPage';

export default function LoginPage() {
  const dispatch = useDispatch();
  const isLogged = () => dispatch(isLoggedAction());

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <Fragment>
      <FormattedMessage {...messages.helmetLoginTitle}>
        {title => <Helmet title={title} />}
      </FormattedMessage>

      <Header />
      <FormattedMessage {...messages.loginToTheSystem}>
        {title => <Subheader title={title} />}
      </FormattedMessage>

      <Information />
      <LoginForm />

      <Footer />
    </Fragment>
  );
}
