import React, { Component, Fragment } from 'react';
// import './Login.css';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import NavigateNext from '@material-ui/icons/NavigateNext';
import AuthService from '../../services/AuthService';

import Header from '../../components/Header';
import HeaderSubheading from '../../components/HeaderSubheading';

const styles = {
  formItem: {
    padding: 10,
    height: 36,
    width: '16rem',
    border: '1px solid grey',
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'white',
    fontSize: 14,
    borderRadius: 2,
  },
  formSubmit: {
    width: '16rem',
    display: 'block',
    margin: '0 auto',
    padding: 5,
    height: 36,
    backgroundColor: '#0098db',
    borderRadius: 2,
    color: 'white',
  },
  formContainer: {
    textAlign: 'center',
    margin: '10px 0',
    width: '100%',
    backgroundColor: '#f2f4f7',
    padding: '15px 0',
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
    padding: '0 150px',
  },
  footerContainer: {
    maxWidth: 550,
    margin: '0 auto',
  },
  textField: {
    margin: '10px auto 0',
    width: '16rem',
    textAlign: 'left',
    fontSize: '17px',
  },
  footerText: {
    textAlign: 'left',
    padding: '0 30px',
  },
  buttonText: {
    position: 'relative',
    top: 2,
  },
};
class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
      error: '',
    };

    this.goToRegister = this.goToRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace('/dashboard');
  }

  goToRegister() {
    this.props.history.replace('/register');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.login, this.state.password)
      .then(res => {
        if (res) {
          this.props.history.replace('/dashboard');
        } else {
          this.setState({
            error: 'Error',
          });
        }
      })
      .catch(err => {
        this.setState({
          error: 'Error catch',
        });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Header />
        <HeaderSubheading headerText="Logowanie" />

        <div className={classes.pageContainer}>
          <div className={classes.alertContainer}>
            <div className={classes.messageContainer}>
              Jeśli skorzystasz z naszej promocji i zarejestrujesz swoje konto
              do końca stycznia w naszym banku,{' '}
              <b>otrzymasz bonus w postaci 10 PLN</b>.<br />
              <br />
              Utworzone konta równie podlegają dla tej promocji.
            </div>
          </div>
          <div className={classes.formContainer}>
            <form noValidate onSubmit={this.handleFormSubmit}>
              <div className={classes.textField}>Numer identyfikacyjny</div>
              <input
                className={classes.formItem}
                placeholder="Wpisz numer"
                name="login"
                type="text"
                onChange={this.handleChange}
              />
              <div className={classes.textField}>Hasło dostępu</div>
              <input
                className={classes.formItem}
                placeholder="Wpisz hasło"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
              {this.state.error}
              <br />
              <button className={classes.formSubmit} type="submit">
                <span className={classes.buttonText}>Dalej</span>
                <NavigateNext />
              </button>
            </form>
          </div>
          <div className={classes.footerContainer}>
            <div className={classes.footerText}>
              Jeśli nie posiadasz jeszcze konta w naszym wspaniałym banku,
              mozesz je utworzyć klikając na{' '}
              <span onClick={this.goToRegister}>Rejestracja</span>.
            </div>
          </div>
          <br />

          <div className={classes.footerContainer}>
            <div className={classes.footerText}>
              Pamiętaj o podstawowych zasadach bezpieczeństwa.
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(LoginPage));
