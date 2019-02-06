import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import AuthService from '../../services/AuthService';

import Header from '../../components/Header';
import HeaderSubheading from '../../components/HeaderSubheading';

const styles = theme => ({
  formItem: {
    padding: 10,
    height: 36,

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
    margin: '20px auto 0',
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
  alertContainer: {
    maxWidth: '1024px',
    padding: '10px 3%',
    margin: '10px auto 0',
    borderRadius: 2,
    backgroundColor: '#0098db',
    color: 'white',
  },
  messageContainer: {
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 130px',
    },
  },
  footerContainer: {
    maxWidth: 550,
    margin: '15px auto',
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
  footerText: {
    textAlign: 'left',
    padding: '0 15px',
    margin: '10px -4px',
  },
  footerInfoText: {
    position: 'relative',
    top: 1,
    fontSize: 13,
  },
  footerAlertText: {
    color: 'red',
    fontSize: 13,
  },
  errorIcon: {
    fontSize: 35,
  },
  footerLink: {
    color: '#0098db',
  },
  buttonText: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
      loginExist: false,
      loginError: '',
      passwordError: '',
    };

    this.goToRegister = this.goToRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmitLogin = this.handleFormSubmitLogin.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/dashboard');
  }

  validateNumber(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  goToRegister() {
    this.props.history.replace('/register');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      passwordError: '',
      loginError: '',
    });
  }

  handleFormSubmitLogin(e) {
    e.preventDefault();

    this.Auth.isLogin(this.state.login)
      .then(res => {
        if (res.isLogin) {
          this.setState({
            loginExist: true,
            loginError: '',
            password: '',
          });
        } else {
          this.setState({
            login: '',
            loginError: 'Proszę podać prawidłowy identyfikator',
          });
        }
      })
      .catch(() => {
        this.setState({
          loginError: 'Proszę podać prawidłowy identyfikator',
        });
      });
  }

  handleFormBack = () => {
    this.setState({
      loginExist: false,
      login: '',
      password: '',
      passwordError: '',
    });
  };

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.login, this.state.password)
      .then(res => {
        if (res) {
          this.props.history.replace('/dashboard');
        } else {
          this.setState({
            passwordError: 'Proszę podać prawidłowy kod dostępu',
            password: '',
          });
        }
      })
      .catch(err => {
        this.setState({
          passwordError: err,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { loginExist, loginError, passwordError } = this.state;
    return (
      <Fragment>
        <Helmet title="Login · Bank Application" />
        <Header />
        <HeaderSubheading headerText="Logowanie" />

        <div className={classes.pageContainer}>
          <div className={classes.alertContainer}>
            <div className={classes.messageContainer}>
              Jeśli skorzystasz z naszej promocji i zarejestrujesz swoje konto
              do końca stycznia w naszym banku,
              <b>otrzymasz bonus w postaci 10 PLN</b>.<br />
              <br />
              Utworzone konta równie podlegają dla tej promocji.
            </div>
          </div>
          <div className={classes.formContainer}>
            <form noValidate onSubmit={this.handleFormSubmit}>
              {!loginExist ? (
                <Fragment>
                  <div className={classes.textField}>Numer identyfikacyjny</div>
                  {[
                    <Fragment key={1}>
                      <input
                        onKeyPress={e => this.validateNumber(e)}
                        className={classNames(classes.formItem, {
                          [classes.formError]: loginError,
                        })}
                        placeholder="Wpisz numer"
                        name="login"
                        type="number"
                        onChange={this.handleChange}
                      />
                      {loginError ? (
                        <div className={classes.textError}>{loginError}</div>
                      ) : null}
                    </Fragment>,
                  ]}
                  <button
                    type="button"
                    className={classes.formSubmit}
                    onClick={this.handleFormSubmitLogin}
                  >
                    <span className={classes.buttonText}>Dalej</span>
                    <NavigateNext />
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <div className={classes.textField}>Hasło dostępu</div>
                  {[
                    <Fragment key={2}>
                      <input
                        className={classNames(classes.formItem, {
                          [classes.formError]: passwordError,
                        })}
                        placeholder="Wpisz hasło"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                      />
                      {passwordError ? (
                        <div className={classes.textError}>{passwordError}</div>
                      ) : null}
                    </Fragment>,
                  ]}
                  <button className={classes.formSubmit} type="submit">
                    <span className={classes.buttonText}>Zaloguj</span>
                  </button>
                  <button type="button" onClick={this.handleFormBack}>
                    <NavigateBefore />
                    <span className={classes.buttonText}>Powrót</span>
                  </button>
                </Fragment>
              )}
              <br />
            </form>
          </div>
          <div className={classes.footerContainer}>
            <div className={classes.footerText}>
              <b>
                Jeśli nie posiadasz jeszcze konta w naszym banku, mozesz je
                utworzyć teraz, klikając na{' '}
                <button
                  type="button"
                  className={classes.footerLink}
                  onClick={this.goToRegister}
                >
                  Rejestracja
                </button>
              </b>
            </div>
          </div>

          <div className={classes.footerContainer}>
            <div className={classes.footerText}>
              <ErrorOutline className={classes.errorIcon} />{' '}
              <span className={classes.footerInfoText}>
                Pamiętaj o podstawowych zasadach bezpieczeństwa.
              </span>
            </div>

            <div className={classes.footerText}>
              <span className={classes.footerInfoText}>
                Zanim wprowadzisz na stronie swój numer identyfikacyjny i hasło
                dostępu, upewnij się, ze:
                <ul>
                  <li>
                    twoje hasło jest bezpieczne. Zawiera conajmniej 8 znaków
                    oraz składa się z wielkich i małych liter
                  </li>
                  <li>
                    w pasku adresu lub na pasku stanu w dolnej części ekranu
                    przeglądarki widoczna jest zamknięta kłódka
                  </li>
                </ul>
              </span>
            </div>

            <div className={classes.footerText}>
              <span className={classes.footerAlertText}>
                Pamiętaj: Bank nie wymaga potwierdzania żadnych danych,
                poprawnego logowania bądź odczytania komunikatów Banku za pomocą
                kodu SMS, TAN i/lub mailem, ani też instalacji jakichkolwiek
                aplikacji na telefonach bądź komputerach użytkowników.
              </span>
            </div>

            <div className={classes.footerText}>
              <span className={classes.footerInfoText}>
                Więcej informacji na temat bezpieczeństwa znajdziesz na stronie:
                Zasady bezpieczeństwa
              </span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  replace: PropTypes.string,
};

export default withStyles(styles)(withRouter(LoginPage));
