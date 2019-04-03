/**
 *
 * RegisterPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import AuthService from 'services/AuthService';

// Import Material UI
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import MobileStepper from '@material-ui/core/MobileStepper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Import Components
import Header from 'components/Header';
import Subheader from 'components/Subheader';
import Footer from 'components/Footer';
import Notification from 'components/Notification';
import Notifier from 'components/Notifier';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeIdSelector,
  makePasswordSelector,
  makeNameSelector,
  makeSurnameSelector,
  makeEmailSelector,
  makeActiveStepSelector,
  makeErrorSelector,
  makeIsDataProcessingAgreementSelector,
  makeErrorDataProcessingAgreementSelector,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  changeIdAction,
  changePasswordAction,
  changeSurnameAction,
  changeNameAction,
  changeEmailAction,
  enterIdAction,
  enterPasswordAction,
  enterNameAction,
  enterSurnameAction,
  enterEmailAction,
  emptyIdAction,
  emptyPasswordAction,
  emptyNameAction,
  emptySurnameAction,
  emptyEmailAction,
  registerStepNextAction,
  registerStepBackAction,
  toggleDataProcessingAgreementAction,
  errorDataProcessingAgreementAction,
} from './actions';

// Import Styles
const styles = theme => ({
  stepperRoot: {
    width: '80%',
    margin: '0 auto',
  },
  stepperContainer: {
    background: '#f2f4f7',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
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
  errorIcon: {
    fontSize: 35,
  },
  buttonText: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  mobileStepper: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    background: '#f2f4f7',
  },
  mobileStepperDots: {
    margin: '0 auto',
  },
  success: {
    backgroundColor: '#0098db',
  },
  formCheckbox: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    display: 'inline-flex',
    paddingTop: 10,
  },
  typographyCheckbox: {
    marginLeft: 2,
    marginTop: 3.5,
  },
  emailInfo: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '17rem',
    },
    margin: '0 auto',
    textAlign: 'left',
    paddingTop: 10,
  },
  typographyEmail: {
    color: 'grey',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getSteps = this.getSteps.bind(this);
    this.Auth = new AuthService();
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) this.props.history.push('/dashboard');
  }

  componentDidUpdate() {
    if (this.Auth.isRegister()) {
      this.props.history.push('/login');
      this.Auth.unsetRegister();
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleClick(e);
    }
  }

  handleClick(e) {
    e.preventDefault();

    if (this.props.activeStep === 0) {
      this.props.id
        ? this.props.onEnterId(this.props.id)
        : this.props.isEmptyId(<FormattedMessage {...messages.inputIDEmpty} />);
    }

    if (this.props.activeStep === 1) {
      this.props.password
        ? this.props.onEnterPassword(this.props.password)
        : this.props.isEmptyPassword(
            <FormattedMessage {...messages.errorPassword} />,
          );
    }

    if (this.props.activeStep === 2) {
      this.props.name
        ? this.props.onEnterName(this.props.name)
        : this.props.isEmptyName(<FormattedMessage {...messages.errorName} />);
    }

    if (this.props.activeStep === 3) {
      this.props.surname
        ? this.props.onEnterSurname(this.props.surname)
        : this.props.isEmptySurname(
            <FormattedMessage {...messages.errorSurname} />,
          );
    }

    if (this.props.activeStep === 4) {
      if (this.props.email && this.props.isDataProcessingAgreement) {
        this.props.onEnterEmail(this.props.email);
      } else if (!this.props.email && !this.props.isDataProcessingAgreement) {
        this.props.errorDataProcessingAgreement(
          <FormattedMessage {...messages.errorCheckbox} />,
        );
        this.props.isEmptyEmail(
          <FormattedMessage {...messages.inputEmailAddressEmpty} />,
        );
      } else if (!this.props.email)
        this.props.isEmptyEmail(
          <FormattedMessage {...messages.inputEmailAddressEmpty} />,
        );
      else if (!this.props.isDataProcessingAgreement)
        this.props.errorDataProcessingAgreement(
          <FormattedMessage {...messages.errorCheckbox} />,
        );
    }
  }

  getSteps() {
    return [
      <FormattedMessage key={1} {...messages.idNumber} />,
      <FormattedMessage key={2} {...messages.password} />,
      <FormattedMessage key={3} {...messages.name} />,
      <FormattedMessage key={4} {...messages.surname} />,
      <FormattedMessage key={5} {...messages.emailAddress} />,
    ];
  }

  getStepContent = step => {
    const {
      classes,
      error,
      isErrorDataProcessingAgreement,
      onChangeEmail,
      onChangeId,
      onChangeName,
      onChangeSurname,
      onChangePassword,
      isDataProcessingAgreement,
      toggleDataProcessingAgreement,
    } = this.props;

    switch (step) {
      case 0:
        return (
          <Fragment>
            <div className={classes.textField}>
              <FormattedMessage {...messages.idNumber} />
            </div>

            <FormattedMessage {...messages.inputLogin}>
              {placeholder => (
                <input
                  className={classNames(classes.formItem, {
                    [classes.formError]: error,
                  })}
                  key={1}
                  placeholder={placeholder}
                  name="login"
                  type="number"
                  onChange={onChangeId}
                  onKeyPress={this.handleKeyPress}
                />
              )}
            </FormattedMessage>

            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <div className={classes.textField}>
              <FormattedMessage {...messages.password} />
            </div>

            <FormattedMessage {...messages.inputPassword}>
              {placeholder => (
                <input
                  key={2}
                  className={classNames(classes.formItem, {
                    [classes.formError]: error,
                  })}
                  placeholder={placeholder}
                  name="password"
                  type="password"
                  onChange={onChangePassword}
                  onKeyPress={this.handleKeyPress}
                />
              )}
            </FormattedMessage>
            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <div className={classes.textField}>
              <FormattedMessage {...messages.name} />
            </div>

            <FormattedMessage {...messages.inputName}>
              {placeholder => (
                <input
                  key={3}
                  className={classNames(classes.formItem, {
                    [classes.formError]: error,
                  })}
                  placeholder={placeholder}
                  name="name"
                  type="text"
                  onChange={onChangeName}
                  onKeyPress={this.handleKeyPress}
                />
              )}
            </FormattedMessage>

            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <div className={classes.textField}>
              <FormattedMessage {...messages.surname} />
            </div>

            <FormattedMessage {...messages.inputSurname}>
              {placeholder => (
                <input
                  key={4}
                  className={classNames(classes.formItem, {
                    [classes.formError]: error,
                  })}
                  placeholder={placeholder}
                  name="surname"
                  type="text"
                  onChange={onChangeSurname}
                  onKeyPress={this.handleKeyPress}
                />
              )}
            </FormattedMessage>

            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 4:
        return (
          <Fragment>
            <div className={classes.textField}>
              <FormattedMessage {...messages.emailAddress} />
            </div>

            <FormattedMessage {...messages.inputEmail}>
              {placeholder => (
                <input
                  key={5}
                  className={classNames(classes.formItem, {
                    [classes.formError]: error,
                  })}
                  placeholder={placeholder}
                  name="email"
                  type="text"
                  onChange={onChangeEmail}
                  onKeyPress={this.handleKeyPress}
                />
              )}
            </FormattedMessage>

            {error ? <div className={classes.textError}>{error}</div> : null}

            <div className={classes.formCheckbox}>
              <Checkbox
                checked={isDataProcessingAgreement}
                onClick={toggleDataProcessingAgreement}
                value="checkedB"
                color="primary"
              />

              <Typography
                variant="subtitle2"
                gutterBottom
                className={classes.typographyCheckbox}
              >
                <FormattedMessage {...messages.checkboxRodo} />
              </Typography>
            </div>
            {isErrorDataProcessingAgreement ? (
              <div className={classes.textError}>
                {isErrorDataProcessingAgreement}
              </div>
            ) : null}
            <div className={classes.emailInfo}>
              <Typography
                variant="caption"
                gutterBottom
                className={classes.typographyEmail}
              >
                <FormattedMessage {...messages.textEmailNeed} />
              </Typography>
            </div>
          </Fragment>
        );
      default:
        return 'Unknown step';
    }
  };

  render() {
    const { classes, activeStep, onRegisterStepBack } = this.props;
    const steps = this.getSteps();

    return (
      <Fragment>
        <FormattedMessage {...messages.helmetRegisterTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>

        <Header />
        <FormattedMessage {...messages.registerText}>
          {title => <Subheader headerText={title} />}
        </FormattedMessage>

        <div className={classes.pageContainer}>
          <Notification />
          <div className={classes.formContainer}>
            <div className={classes.stepperRoot}>
              <MobileStepper
                variant="dots"
                steps={5}
                position="static"
                activeStep={activeStep}
                classes={{
                  root: classes.mobileStepper,
                  dots: classes.mobileStepperDots,
                }}
              />
              <Stepper
                className={classes.stepperContainer}
                activeStep={activeStep}
              >
                {steps.map(label => {
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
                {activeStep === steps.length ? null : (
                  <div>
                    <span className={classes.instructions}>
                      <form noValidate autoComplete="off">
                        {this.getStepContent(activeStep)}
                      </form>
                    </span>

                    {activeStep === steps.length - 1 ? (
                      <Fragment>
                        <button
                          className={classes.formSubmit}
                          onClick={this.handleClick}
                          type="submit"
                        >
                          <span className={classes.buttonText}>
                            <FormattedMessage {...messages.createAnAccount} />
                          </span>
                        </button>
                      </Fragment>
                    ) : (
                      [
                        activeStep === 0 ? (
                          <button
                            type="button"
                            key={1}
                            className={classes.formSubmit}
                            onClick={this.handleClick}
                            disabled={activeStep === 4}
                          >
                            <span className={classes.buttonText}>
                              <FormattedMessage {...messages.nextText} />
                            </span>
                            <NavigateNext />
                          </button>
                        ) : activeStep === 1 ? (
                          <button
                            key={1}
                            type="button"
                            className={classes.formSubmit}
                            onClick={this.handleClick}
                            disabled={activeStep === 4}
                          >
                            <span className={classes.buttonText}>
                              <FormattedMessage {...messages.nextText} />
                            </span>
                            <NavigateNext />
                          </button>
                        ) : activeStep === 2 ? (
                          <button
                            key={1}
                            type="button"
                            className={classes.formSubmit}
                            onClick={this.handleClick}
                            disabled={activeStep === 4}
                          >
                            <span className={classes.buttonText}>
                              <FormattedMessage {...messages.nextText} />
                            </span>
                            <NavigateNext />
                          </button>
                        ) : activeStep === 3 ? (
                          <button
                            key={1}
                            type="button"
                            className={classes.formSubmit}
                            onClick={this.handleClick}
                            disabled={activeStep === 4}
                          >
                            <span className={classes.buttonText}>
                              <FormattedMessage {...messages.nextText} />
                            </span>
                            <NavigateNext />
                          </button>
                        ) : null,
                      ]
                    )}

                    {activeStep !== 0 ? (
                      <button
                        type="button"
                        disabled={activeStep === 0}
                        onClick={onRegisterStepBack}
                      >
                        <NavigateBefore />
                        <span className={classes.buttonText}>
                          <FormattedMessage {...messages.backText} />
                        </span>
                      </button>
                    ) : null}
                    <Notifier />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  id: makeIdSelector(),
  password: makePasswordSelector(),
  name: makeNameSelector(),
  surname: makeSurnameSelector(),
  email: makeEmailSelector(),
  isDataProcessingAgreement: makeIsDataProcessingAgreementSelector(),
  isErrorDataProcessingAgreement: makeErrorDataProcessingAgreementSelector(),
  error: makeErrorSelector(),
  activeStep: makeActiveStepSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeId: e => dispatch(changeIdAction(e.target.value)),
    onChangePassword: e => dispatch(changePasswordAction(e.target.value)),
    onChangeName: e => dispatch(changeNameAction(e.target.value)),
    onChangeSurname: e => dispatch(changeSurnameAction(e.target.value)),
    onChangeEmail: e => dispatch(changeEmailAction(e.target.value)),
    onEnterId: id => dispatch(enterIdAction(id)),
    onEnterPassword: password => dispatch(enterPasswordAction(password)),
    onEnterName: name => dispatch(enterNameAction(name)),
    onEnterSurname: surname => dispatch(enterSurnameAction(surname)),
    onEnterEmail: email => dispatch(enterEmailAction(email)),
    isEmptyId: error => dispatch(emptyIdAction(error)),
    isEmptyPassword: error => dispatch(emptyPasswordAction(error)),
    isEmptyName: error => dispatch(emptyNameAction(error)),
    isEmptySurname: error => dispatch(emptySurnameAction(error)),
    isEmptyEmail: error => dispatch(emptyEmailAction(error)),
    toggleDataProcessingAgreement: () =>
      dispatch(toggleDataProcessingAgreementAction()),
    errorDataProcessingAgreement: error => {
      dispatch(errorDataProcessingAgreementAction(error));
    },
    onRegisterStepNext: () => dispatch(registerStepNextAction()),
    onRegisterStepBack: () => dispatch(registerStepBackAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'registerPage', reducer });
const withSaga = injectSaga({ key: 'registerPage', saga });

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);
