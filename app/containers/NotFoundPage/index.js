/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Header from '../../components/Header';
import HeaderSubheading from '../../components/HeaderSubheading';

import messages from './messages';

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
    padding: '25px 0',
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

class NotFoundPage extends Component {
  constructor() {
    super();

    this.goToRegister = this.goToRegister.bind(this);
  }

  goToRegister() {
    this.props.history.replace('/register');
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Helmet title="Not Found Page · Bank Application" />
        <Header />
        <HeaderSubheading headerText="Not Found Page" />

        <div className={classes.pageContainer}>
          <div className={classes.formContainer}>
            <Typography variant="h5">
              Przepraszamy, ta strona jest niedostępna.
            </Typography>
            Kliknięty link mógł być uszkodzony lub strona mogła zostać usunięta.
          </div>
          <div className={classes.footerContainer}>
            <div className={classes.footerText}>
              <b>
                Jeśli nie posiadasz jeszcze konta w naszym banku, mozesz je
                utworzyć teraz, klikając na{' '}
                <span
                  className={classes.footerLink}
                  onClick={this.goToRegister}
                >
                  Rejestracja
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

export default withStyles(styles)(withRouter(NotFoundPage));
