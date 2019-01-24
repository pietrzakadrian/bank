/*
 * Payment
 *
 * This is the first page thing users see of our App after logging in, at the '/login' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import { withSnackbar } from 'notistack';
import MobileStepper from '@material-ui/core/MobileStepper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';

import { FormattedMessage } from 'react-intl';
import AuthService from '../../services/AuthService';
import withAuth from '../../services/withAuth';
import messages from './messages';

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  container: {
    margin: '10px auto',
    width: '1100px',
  },
  center: {
    textAlign: 'center',
    maxWidth: 1100,
    margin: '0 auto',
  },
  stepperRoot: {
    width: '80%',
    margin: '0 auto',
  },
  stepperContainer: {
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
  mobileStepper: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileStepperDots: {
    margin: '0 auto',
  },
  success: {
    backgroundColor: '#0098db',
  },
});

function getSteps() {
  return [
    'Numer rachunku ',
    'Ilość pieniędzy',
    'Tytuł przelewu',
    'Potwierdź dane',
  ];
}

class PaymentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_sender: this.props.user.id,
      account_bill: '',
      amount_money: '',
      transfer_title: '',
      error: '',
      activeStep: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  getStepContent = step => {
    const { classes } = this.props;
    const { error } = this.state;

    switch (step) {
      case 0:
        return (
          <Fragment>
            <div className={classes.textField}>Numer rachunku</div>
            <input
              className={classNames(classes.formItem, {
                [classes.formError]: error,
              })}
              placeholder="Wpisz numer"
              name="account_bill"
              type="number"
              onChange={this.handleChange}
              onKeyPress={e => this.validateNumber(e)}
            />
            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <div className={classes.textField}>Ilość pieniędzy</div>
            <input
              className={classNames(classes.formItem, {
                [classes.formError]: error,
              })}
              placeholder="Wpisz ilość"
              name="amount_money"
              type="number"
              onChange={this.handleChange}
            />
            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <div className={classes.textField}>Tytuł przelewu</div>
            <input
              className={classNames(classes.formItem, {
                [classes.formError]: error,
              })}
              placeholder="Wpisz tytuł"
              name="transfer_title"
              type="text"
              onChange={this.handleChange}
            />

            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <div className={classes.textField}>Potwierdź dane</div>

            <p>potwierdzam dane</p>

            <input
              className={classNames(classes.formItem, {
                [classes.formError]: error,
              })}
              placeholder="test"
              type="text"
            />
            {error ? <div className={classes.textError}>{error}</div> : null}
          </Fragment>
        );
      default:
        return 'Unknown step';
    }
  };

  validateNumber(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmit = variant => e => {
    e.preventDefault();

    this.Auth.makePayment(
      this.state.id_sender,
      this.state.account_bill,
      this.state.amount_money,
      this.state.transfer_title,
    )
      .then(res => {
        if (res) {
          this.props.enqueueSnackbar('Przelew został wykonany.', {
            variant,
          });
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
  };

  handleBack = () => {
    const {
      activeStep,
      account_bill,
      amount_money,
      transfer_title,
    } = this.state;

    if (activeStep === 1 && account_bill !== '') {
      this.setState({
        account_bill: '',
      });
    } else if (activeStep === 2 && amount_money !== '') {
      this.setState({
        amount_money: '',
      });
    } else if (activeStep === 3 && transfer_title !== '') {
      this.setState({
        transfer_title: '',
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
        <Helmet title="Payment · Bank Application" />
        <div className={classes.center}>
          <MobileStepper
            variant="dots"
            steps={5}
            position="static"
            activeStep={this.state.activeStep}
            classes={{
              root: classes.mobileStepper,
              dots: classes.mobileStepperDots,
            }}
          />

          <Stepper className={classes.stepperContainer} activeStep={activeStep}>
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
            {activeStep === steps.length ? null : (
              <div>
                <Typography className={classes.instructions}>
                  <form noValidate onSubmit={this.handleFormSubmit('success')}>
                    {this.getStepContent(activeStep)}
                  </form>
                </Typography>

                {activeStep === steps.length - 1 ? (
                  <button
                    className={classes.formSubmit}
                    onClick={this.handleFormSubmit('success')}
                    type="submit"
                  >
                    <span className={classes.buttonText}>Utwórz konto</span>
                  </button>
                ) : (
                  [
                    activeStep === 0 ? (
                      <button
                        className={classes.formSubmit}
                        onClick={this.isLogin}
                        disabled={this.state.activeStep === 4}
                      >
                        <span className={classes.buttonText}>Dalej</span>
                        <NavigateNext />
                      </button>
                    ) : (
                      <button
                        className={classes.formSubmit}
                        onClick={this.handleNext}
                        disabled={this.state.activeStep === 4}
                      >
                        <span className={classes.buttonText}>Dalej</span>
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
      </Fragment>
    );
  }
}

PaymentPage.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withAuth(
  withStyles(styles, { withTheme: true })(withSnackbar(PaymentPage)),
);
