/* eslint-disable indent */
/**
 *
 * SettingsPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AuthService from 'services/AuthService';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Import Components
import LocaleToggle from 'components/LocaleToggle';
import CurrencyToggle from 'components/CurrencyToggle';
import Copyright from 'components/Copyright';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSettingsPage, {
  makeNewPasswordSelector,
  makeNewNameSelector,
  makeNewSurnameSelector,
  makeNewEmailSelector,
  makeMessageSelector,
  makeErrorPasswordSelector,
  makeErrorNameSelector,
  makeErrorSurnameSelector,
  makeErrorEmailSelector,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  changeNewNameAction,
  changeNewSurnameAction,
  changeNewEmailAction,
  changeNewPasswordAction,
  enterNewNameAction,
  enterNewSurnameAction,
  enterNewEmailAction,
  enterNewPasswordAction,
  emptyDataAction,
  saveDataAction,
} from './actions';

const styles = theme => ({
  center: {
    textAlign: 'center',
    maxWidth: 1100,
    margin: '0 auto',
  },
  formItem: {
    padding: 10,
    height: 36,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    border: '1px solid grey',
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'white',
    fontSize: 14,
    borderRadius: 2,
  },
  formSubmit: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    display: 'block',
    margin: '20px auto 0',
    padding: 5,
    height: 36,
    backgroundColor: '#0098db',
    borderRadius: 2,
    color: 'white',

    '&:hover': {
      transition: '0.150s',
      backgroundColor: '#15a0dd',
      cursor: 'pointer',
    },
  },
  formContainer: {
    textAlign: 'center',
    margin: '15px 0',
    width: '100%',
    backgroundColor: '#f2f4f7',
    padding: '15px 0 35px',
  },
  formError: {
    border: '1px solid red',
    borderRadius: 2,
  },
  textMessage: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    margin: '5px auto',
    fontSize: 14.5,
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
  textField: {
    margin: '10px auto 0',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    textAlign: 'left',
    fontSize: '18px',
    letterSpacing: 0.3,
  },
  textFieldLocaleToggle: {
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    margin: '0 auto',
    fontSize: 14.5,
  },
  href: {
    textDecoration: 'none',
    color: 'white',
  },
  formMessage: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    display: 'block',
    margin: '0px auto 20px;',
    padding: 5,
    height: 36,
    backgroundColor: '#0098db',
    borderRadius: 2,
    color: 'white',

    '&:hover': {
      transition: '0.150s',
      backgroundColor: '#15a0dd',
      cursor: 'pointer',
    },
  },
  localeToggleContainer: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    margin: '0px auto 20px;',
  },
});

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.Auth = new AuthService();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.isLoading === false ? this.handleClick(e) : null;
    }
  }

  handleClick(e) {
    e.preventDefault();

    this.props.newEmail ||
    this.props.newName ||
    this.props.newSurname ||
    this.props.newPassword
      ? this.props.onSaveData()
      : null;

    !this.props.newEmail &&
    !this.props.newName &&
    !this.props.newSurname &&
    !this.props.newPassword
      ? this.props.onEmptySaveData(
          <FormattedMessage {...messages.saveDataEmpty} />,
        )
      : null;
  }

  render() {
    const {
      classes,
      errorPassword,
      errorName,
      errorSurname,
      errorEmail,
      message,
      onChangeNewName,
      onChangeNewSurname,
      onChangeNewPassword,
      onChangeNewEmail,
    } = this.props;
    return (
      <Fragment>
        <FormattedMessage {...messages.helmetSettingsTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>

        <div className={classes.center}>
          <Grid container spacing={24}>
            <Grid item xs={12} lg={6}>
              <form noValidate autoComplete="off">
                <div className={classes.textField}>
                  <FormattedMessage {...messages.changeName} />
                </div>

                <FormattedMessage {...messages.inputNewName}>
                  {placeholder => (
                    <input
                      key={1}
                      className={classNames(
                        classes.formItem,
                        classes.formSpecial,
                        {
                          [classes.formError]: errorName,
                        },
                      )}
                      name="name"
                      placeholder={placeholder}
                      type="text"
                      onChange={onChangeNewName}
                      onKeyPress={this.handleKeyPress}
                    />
                  )}
                </FormattedMessage>

                {errorName ? (
                  <div className={classes.textError}>{errorName}</div>
                ) : null}

                <div className={classes.textField}>
                  <FormattedMessage {...messages.changeSurname} />
                </div>
                <FormattedMessage {...messages.inputNewSurname}>
                  {placeholder => (
                    <input
                      key={2}
                      className={classNames(
                        classes.formItem,
                        classes.formSpecial,
                        {
                          [classes.formError]: errorSurname,
                        },
                      )}
                      name="surname"
                      placeholder={placeholder}
                      type="text"
                      onChange={onChangeNewSurname}
                      onKeyPress={this.handleKeyPress}
                    />
                  )}
                </FormattedMessage>

                {errorSurname ? (
                  <div className={classes.textError}>{errorSurname}</div>
                ) : null}

                <div className={classes.textField}>
                  <FormattedMessage {...messages.changePassword} />
                </div>
                <FormattedMessage {...messages.inputNewPassword}>
                  {placeholder => (
                    <input
                      key={3}
                      className={classNames(
                        classes.formItem,
                        classes.formSpecial,
                        {
                          [classes.formError]: errorPassword,
                        },
                      )}
                      name="password"
                      placeholder={placeholder}
                      type="password"
                      onChange={onChangeNewPassword}
                      onKeyPress={this.handleKeyPress}
                    />
                  )}
                </FormattedMessage>

                {errorPassword ? (
                  <div className={classes.textError}>{errorPassword}</div>
                ) : null}

                <div className={classes.textField}>
                  <FormattedMessage {...messages.changeEmail} />
                </div>
                <FormattedMessage {...messages.inputNewEmail}>
                  {placeholder => (
                    <input
                      key={4}
                      className={classNames(
                        classes.formItem,
                        classes.formSpecial,
                        {
                          [classes.formError]: errorEmail,
                        },
                      )}
                      name="email"
                      placeholder={placeholder}
                      type="text"
                      onChange={onChangeNewEmail}
                      onKeyPress={this.handleKeyPress}
                    />
                  )}
                </FormattedMessage>

                {errorEmail ? (
                  <div className={classes.textError}>{errorEmail}</div>
                ) : null}

                {message &&
                !errorEmail &&
                !errorName &&
                !errorSurname &&
                !errorPassword ? (
                  <div className={classes.textMessage}>{message}</div>
                ) : null}

                <button
                  className={classes.formSubmit}
                  type="submit"
                  onClick={this.handleClick}
                >
                  <span className={classes.buttonText}>
                    <FormattedMessage {...messages.saveData} />
                  </span>
                </button>
              </form>
            </Grid>

            <Grid item xs={12} lg={6}>
              <div className={classes.textField}>
                <FormattedMessage {...messages.changeLang} />
              </div>

              <div className={classes.localeToggleContainer}>
                <LocaleToggle />
              </div>

              <div className={classes.textField}>
                <FormattedMessage {...messages.changeCurrency} />
              </div>

              <CurrencyToggle />

              <div className={classes.textField}>
                <FormattedMessage {...messages.reportError} />
              </div>

              <button className={classes.formMessage} type="button">
                <span className={classes.buttonText}>
                  <a
                    className={classes.href}
                    href="mailto:contact@pietrzakadrian.com"
                  >
                    <FormattedMessage {...messages.contactTheDeveloper} />
                  </a>
                </span>
              </button>
            </Grid>
          </Grid>
        </div>
        <Copyright />
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
  newPassword: makeNewPasswordSelector(),
  newName: makeNewNameSelector(),
  newSurname: makeNewSurnameSelector(),
  newEmail: makeNewEmailSelector(),
  errorPassword: makeErrorPasswordSelector(),
  errorName: makeErrorNameSelector(),
  errorSurname: makeErrorSurnameSelector(),
  errorEmail: makeErrorEmailSelector(),
  message: makeMessageSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeNewName: e => dispatch(changeNewNameAction(e.target.value)),
    onChangeNewSurname: e => dispatch(changeNewSurnameAction(e.target.value)),
    onChangeNewEmail: e => dispatch(changeNewEmailAction(e.target.value)),
    onChangeNewPassword: e => dispatch(changeNewPasswordAction(e.target.value)),
    onEmptySaveData: error => dispatch(emptyDataAction(error)),
    onSaveData: () => dispatch(saveDataAction()),
    onSaveNewName: name => dispatch(enterNewNameAction(name)),
    onSaveNewSurname: surname => dispatch(enterNewSurnameAction(surname)),
    onSaveNewEmail: email => dispatch(enterNewEmailAction(email)),
    onSaveNewPassword: password => dispatch(enterNewPasswordAction(password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settingsPage', reducer });
const withSaga = injectSaga({ key: 'settingsPage', saga });

export default compose(
  withStyles(styles, { withTheme: true }),
  withReducer,
  withSaga,
  withConnect,
)(SettingsPage);
