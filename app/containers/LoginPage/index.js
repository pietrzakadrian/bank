/* eslint-disable indent */
/**
 *
 * LoginPage
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AuthService from 'services/AuthService';

// Import Material UI
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Notification from 'components/Notification';
import Footer from 'components/Footer';

// Import Redux
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeIdSelector,
  makeIdErrorSelector,
  makePasswordSelector,
  makePasswordErrorSelector,
  makeIsIdExistSelector,
  makeLoginErrorSelector,
  makeIsLoadingSelector,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  changeIdAction,
  changePasswordAction,
  enterIdAction,
  enterPasswordAction,
  emptyIdAction,
  emptyPasswordAction,
  loginStepBackAction,
} from './actions';

// Import Styles
const styles = theme => ({
  formItem: {
    padding: 10,
    height: 37,
    border: '1px solid grey',
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'white',
    fontSize: 14,
    borderRadius: 2,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
  },
  formSubmit: {
    display: 'block',
    margin: '20px auto 10px',
    padding: 5,
    height: 36,
    backgroundColor: '#0098db',
    borderRadius: 2,
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },

    '&:hover': {
      backgroundColor: '#15a0dd',
      cursor: 'pointer',
      transition: '0.150s',
    },
  },
  formContainer: {
    textAlign: 'center',
    margin: '15px 0',
    width: '100%',
    backgroundColor: '#f2f4f7',
    padding: '15px 0',
  },
  formError: {
    border: '1px solid red',
    borderRadius: 2,
  },
  pageContainer: {
    textAlign: 'center',
  },
  textField: {
    margin: '10px auto 0',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    textAlign: 'left',
    fontSize: '18px',
    letterSpacing: 0.3,
  },
  textError: {
    color: 'red',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    margin: '0 auto',
    fontSize: 14.5,
  },
  buttonText: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});
/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleEnterId = this.handleEnterId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readCookie = this.readCookie.bind(this);
    this.Auth = new AuthService();
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) this.props.history.push('/dashboard');
  }

  componentDidUpdate() {
    if (this.Auth.loggedIn()) this.props.history.push('/dashboard');
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.isLoading === false ? this.handleEnterId(e) : null;
    }
  }

  handleEnterId(e) {
    e.preventDefault();
    this.props.id
      ? this.props.onEnterId(this.props.id)
      : this.props.isEmptyId(<FormattedMessage {...messages.loginEmpty} />);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.password
      ? this.props.onEnterPassword(this.props.password)
      : this.props.isEmptyPassword(
          <FormattedMessage {...messages.passwordEmpty} />,
        );
  }

  readCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  render() {
    const {
      classes,
      isIdExist,
      idError,
      isLoading,
      passwordError,
      loginError,
      onChangeId,
      onChangePassword,
      onLoginStepBack,
    } = this.props;
    return (
      <Fragment>
        <FormattedMessage {...messages.helmetLoginTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>

        <Header />
        <FormattedMessage {...messages.loginToTheSystem}>
          {title => <Subheader headerText={title} />}
        </FormattedMessage>

        <div className={classes.pageContainer}>
          <Notification />

          <div className={classes.formContainer}>
            <form
              id="form_login"
              key="form_login"
              noValidate
              autoComplete="off"
            >
              {!isIdExist ? (
                <Fragment>
                  <div className={classes.textField}>
                    <FormattedMessage {...messages.numberId} />
                  </div>
                  {[
                    <Fragment key={1}>
                      <FormattedMessage {...messages.inputNumber}>
                        {placeholder => (
                          <input
                            id="login_login"
                            form="form_login"
                            key={1}
                            className={classNames(classes.formItem, {
                              [classes.formError]: idError || loginError,
                            })}
                            placeholder={placeholder}
                            name="login_login"
                            type="number"
                            onChange={onChangeId}
                            onKeyPress={this.handleKeyPress}
                          />
                        )}
                      </FormattedMessage>
                      {idError || loginError ? (
                        <div className={classes.textError}>
                          {idError || loginError}
                        </div>
                      ) : null}
                    </Fragment>,
                  ]}
                  <button
                    type="button"
                    className={classes.formSubmit}
                    onClick={this.handleEnterId}
                    disabled={isLoading}
                  >
                    <span className={classes.buttonText}>
                      <FormattedMessage {...messages.nextText} />
                    </span>
                    <NavigateNext />
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <div className={classes.textField}>
                    <FormattedMessage {...messages.accessCode} />
                  </div>
                  {[
                    <Fragment key={2}>
                      <FormattedMessage {...messages.inputPassowrd}>
                        {placeholder => (
                          <input
                            key={2}
                            form="form_login"
                            id="login_password"
                            className={classNames(classes.formItem, {
                              [classes.formError]: passwordError || loginError,
                            })}
                            placeholder={placeholder}
                            name="password"
                            type="password"
                            onChange={onChangePassword}
                          />
                        )}
                      </FormattedMessage>
                      {passwordError || loginError ? (
                        <div className={classes.textError}>
                          {passwordError || loginError}
                        </div>
                      ) : null}
                    </Fragment>,
                  ]}

                  <button
                    className={classes.formSubmit}
                    type="submit"
                    disabled={isLoading}
                    onClick={this.handleSubmit}
                  >
                    <span className={classes.buttonText}>
                      <FormattedMessage {...messages.inputLogin} />
                    </span>
                  </button>
                  <button type="button" onClick={onLoginStepBack}>
                    <NavigateBefore />
                    <span className={classes.buttonText}>
                      <FormattedMessage {...messages.backText} />
                    </span>
                  </button>
                </Fragment>
              )}
            </form>
          </div>

          <Footer />
        </div>
      </Fragment>
    );
  }
}

LoginPage.propTypes = {
  id: PropTypes.string,
  password: PropTypes.string,
  isIdExist: PropTypes.bool,
  onChangeId: PropTypes.func,
  onChangePassword: PropTypes.func,
  onEnterId: PropTypes.func,
  onEnterPassword: PropTypes.func,
  isEmptyId: PropTypes.func,
  isEmptyPassword: PropTypes.func,
  onLoginStepBack: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  id: makeIdSelector(),
  idError: makeIdErrorSelector(),
  password: makePasswordSelector(),
  passwordError: makePasswordErrorSelector(),
  loginError: makeLoginErrorSelector(),
  isIdExist: makeIsIdExistSelector(),
  isLoading: makeIsLoadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeId: e => dispatch(changeIdAction(e.target.value)),
    onChangePassword: e => dispatch(changePasswordAction(e.target.value)),
    onEnterId: id => dispatch(enterIdAction(id)),
    onEnterPassword: password => dispatch(enterPasswordAction(password)),
    isEmptyId: error => dispatch(emptyIdAction(error)),
    isEmptyPassword: error => dispatch(emptyPasswordAction(error)),
    onLoginStepBack: () => dispatch(loginStepBackAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({
  key: 'loginPage',
  saga,
});

export default compose(
  withStyles(styles),
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
