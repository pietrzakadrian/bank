import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Button from '@material-ui/core/Button';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AuthService from '../../services/AuthService';

import Header from '../../components/Header';
import HeaderSubheading from '../../components/HeaderSubheading';

const styles = {
  stepperRoot: {
    width: '80%',
    margin: '0 auto',
  },
  stepperContainer: {
    background: '#f2f4f7',
  },
  formItem: {
    padding: 10,
    height: 36,
    width: '17rem',
    border: '1px solid grey',
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'white',
    fontSize: 14,
    borderRadius: 2,
  },
  formSubmit: {
    width: '17rem',
    display: 'block',
    margin: '20px auto 0',
    padding: 5,
    height: 36,
    backgroundColor: '#0098db',
    borderRadius: 2,
    color: 'white',
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
    padding: '0 130px',
  },
  footerContainer: {
    maxWidth: 550,
    margin: '15px auto',
  },
  textField: {
    margin: '10px auto 0',
    width: '17rem',
    textAlign: 'left',
    fontSize: '18px',
    letterSpacing: 0.3,
  },
  textError: {
    color: 'red',
    textAlign: 'left',
    width: '17rem',
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
    position: 'relative',
  },
  registerCompleted: {
    padding: 10,
  },
};

function getSteps() {
  return [
    'Numer identyfikacyjny ',
    'Hasło dostępu',
    'Imię',
    'Nazwisko',
    'Adres',
  ];
}

class RegisterPage extends Component {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
      name: '',
      surname: '',
      address: '',
      loginExist: false,
      loginError: '',
      error: '',
      activeStep: 0,
    };

    this.goToLogin = this.goToLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormSubmitLogin = this.handleFormSubmitLogin.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/dashboard');
  }

  getStepContent = step => {
    const { classes } = this.props;
    const { loginError, error } = this.state;
    switch (step) {
      case 0:
        return (
          <Fragment>
            <div className={classes.textField}>Numer identyfikacyjny</div>
            <input
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
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <div className={classes.textField}>Hasło dostępu</div>
            <input
              className={classNames(classes.formItem, {
                [classes.formError]: error,
              })}
              placeholder="Wpisz hasło"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <div className={classes.textField}>Imię</div>
            <input
              className={classNames(classes.formItem, {
                [classes.formError]: error,
              })}
              placeholder="Wpisz imię"
              name="name"
              type="text"
              onChange={this.handleChange}
            />
            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <div className={classes.textField}>Nazwisko</div>
            <input
              className={classNames(classes.formItem, {
                [classes.formError]: error,
              })}
              placeholder="Wpisz nazwisko"
              name="surname"
              type="text"
              onChange={this.handleChange}
            />
            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 4:
        return (
          <Fragment>
            <div className={classes.textField}>Adres</div>
            <input
              className={classNames(classes.formItem, {
                [classes.formError]: error,
              })}
              placeholder="Wpisz adres"
              name="address"
              type="text"
              onChange={this.handleChange}
            />
            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      default:
        return 'Unknown step';
    }
  };

  goToLogin() {
    this.props.history.replace('/login');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmitLogin(e) {
    e.preventDefault();

    if (this.state.login === '') {
      this.setState({
        loginError: 'Proszę wprowadzić identyfikator',
      });
      return;
    }

    this.Auth.checkLoginExist(this.state.login)
      .then(res => {
        if (!res) {
          this.setState(state => ({
            activeStep: state.activeStep + 1,
          }));

          this.setState({
            loginExist: true,
            loginError: '',
          });

          document.getElementsByTagName('input').password.value = '';
        } else {
          this.setState({
            loginExist: false,
            loginError: 'Istnieje juz taki numer',
          });
        }
      })
      .catch(err => {
        this.setState({
          loginError: 'Error catchą',
        });
      });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { activeStep, address } = this.state;
    if (activeStep === 4 && address === '') {
      document.getElementsByTagName('input').address.value = '';
      this.setState({
        error: 'Proszę podać adres',
      });
      return;
    }

    this.Auth.register(
      this.state.login,
      this.state.password,
      this.state.name,
      this.state.surname,
      this.state.address,
    )
      .then(res => {
        this.setState({
          activeStep: activeStep + 1,
        });
      })
      .catch(err => {
        this.setState({
          error: 'Error catch handleFormSubmit',
        });
      });
  }

  handleNext = () => {
    const { activeStep, password, name, surname, address } = this.state;

    if (activeStep === 1 && password === '') {
      document.getElementsByTagName('input').password.value = '';
      this.setState({
        error: 'Proszę podać hasło',
      });
    } else if (activeStep === 2 && name === '') {
      document.getElementsByTagName('input').name.value = '';
      this.setState({
        error: 'Proszę podać imię',
      });
    } else if (activeStep === 3 && surname === '') {
      document.getElementsByTagName('input').surname.value = '';
      this.setState({
        error: 'Proszę podać nazwisko',
      });
    } else if (activeStep === 4 && address === '') {
      document.getElementsByTagName('input').address.value = '';
      this.setState({
        error: 'Proszę podać adres',
      });
    } else {
      this.setState({
        activeStep: activeStep + 1,
        error: '',
      });

      if (activeStep === 1) {
        document.getElementsByTagName('input').password.value = '';
      } else if (activeStep === 2) {
        document.getElementsByTagName('input').name.value = '';
      } else if (activeStep === 3) {
        document.getElementsByTagName('input').surname.value = '';
      } else if (activeStep === 4) {
        document.getElementsByTagName('input').address.value = '';
      }
    }
  };

  handleBack = () => {
    const { activeStep, login, password, name, surname, address } = this.state;

    if (activeStep === 1 && login !== '') {
      this.setState({
        login: '',
      });
    } else if (activeStep === 2 && password !== '') {
      this.setState({
        password: '',
      });
    } else if (activeStep === 3 && name !== '') {
      this.setState({
        name: '',
      });
    } else if (activeStep === 4 && surname !== '') {
      this.setState({
        surname: '',
      });
    } else if (activeStep === 5 && address !== '') {
      this.setState({
        address: '',
      });
    }

    this.setState({
      activeStep: activeStep - 1,
      error: '',
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <Fragment>
        <Header />
        <HeaderSubheading headerText="Rejestracja" />

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
            {/*  */}

            <div className={classes.stepperRoot}>
              <Stepper
                className={classes.stepperContainer}
                activeStep={activeStep}
              >
                {steps.map((label, index) => {
                  const props = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...props}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div className={classes.registerCompleted}>
                    Konto zostało utworzone. Mozesz przejdź do{' '}
                    <span
                      onClick={this.goToLogin}
                      className={classes.footerLink}
                    >
                      Logowania
                    </span>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      <form noValidate onSubmit={this.handleFormSubmit}>
                        {this.getStepContent(activeStep)}
                      </form>
                    </Typography>

                    {activeStep === steps.length - 1 ? (
                      <button
                        className={classes.formSubmit}
                        onClick={this.handleFormSubmit}
                        type="submit"
                      >
                        <span className={classes.buttonText}>Utwórz konto</span>
                      </button>
                    ) : (
                      [
                        activeStep === 0 ? (
                          <button
                            className={classes.formSubmit}
                            onClick={this.handleFormSubmitLogin}
                            disabled={this.state.activeStep === 4}
                          >
                            <span className={classes.buttonText}>
                              Dalej (przed loginem)
                            </span>
                            <NavigateNext />
                          </button>
                        ) : (
                          <button
                            className={classes.formSubmit}
                            onClick={this.handleNext}
                            disabled={this.state.activeStep === 4}
                          >
                            <span className={classes.buttonText}>
                              Dalej (po loginie)
                            </span>
                            <NavigateNext />
                          </button>
                        ),
                      ]
                    )}

                    {activeStep !== 0 ? (
                      <button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack}
                      >
                        <NavigateBefore />
                        <span className={classes.buttonText}>Powrót</span>
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={classes.footerContainer}>
            <div className={classes.footerText}>
              <b>
                Jeśli posiadasz juz konto w naszym banku, mozesz się zalogować
                przechodząc do{' '}
                <span onClick={this.goToLogin} className={classes.footerLink}>
                  Logowania
                </span>
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(
  withRouter(RegisterPage),
);
