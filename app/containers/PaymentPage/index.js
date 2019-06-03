/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/**
 *
 * PaymentPage
 *
 */

import React, { Fragment } from 'react';
import './style.css';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import Autosuggest from 'react-autosuggest';
import { withSnackbar } from 'notistack';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AuthService from 'services/AuthService';

// Import Material-UI
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

// Import Components
import Notifier from 'components/Notifier';
import Copyright from 'components/Copyright';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Warning from './Warning';

import {
  makeAccountBillsSelector,
  makeAccountNumberSelector,
  makeAmountMoneySelector,
  makeTransferTitleSelector,
  makeAuthorizationKeySelector,
  makeActiveStepSelector,
  makeIsLoadingSelector,
  makeMessageSelector,
  makeErrorSelector,
  makeValueSelector,
  makeSelectPaymentPage,
  makeIsSendAuthorizationKeySelector,
  makeCurrencySelector,
  makeAuthorizationKeyWithoutEmailSelector,
} from './selectors';
import {
  changeAccountNumberAction,
  changeAmountMoneyAction,
  changeTransferTitleAction,
  changeAuthorizationKeyAction,
  enterAccountNumberAction,
  enterAmountMoneyAction,
  enterTransferTitleAction,
  enterAuthorizationKeyAction,
  paymentStepNextAction,
  paymentStepBackAction,
  clearAccountBillsAction,
  searchAccountBillsAction,
  emptyAccountNumberAction,
  emptyAmountNumberAction,
  emptyTransferTitleAction,
  emptyAuthorizationKeyAction,
  sendAuthorizationKeyAction,
  getCurrencyAction,
  getAuthorizationKeyAction,
} from './actions';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

// Import Styles
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
    height: 37,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
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
      width: '300px',
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

  formItemAuthCode: {
    padding: 10,
    height: 37,
    [theme.breakpoints.down('sm')]: {
      width: '84%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
    },
    border: '1px solid grey',
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'white',
    fontSize: 14,
    borderRadius: 2,
  },

  formAuthCode: {
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      marginLeft: '20px',
    },
    [theme.breakpoints.down('md')]: {
      width: '95%',
    },
    [theme.breakpoints.up('md')]: {
      width: '300px',
      margin: '10px auto 0px',
    },
    display: 'block',
    padding: 5,
    height: 37,
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
      width: '300px',
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
      width: '300px',
    },
    margin: '0 auto',
    fontSize: 14.5,
  },
  textMessage: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
    },
    margin: '0 auto',
    fontSize: 14.5,
  },
  textMessageSearch: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
    },
    margin: '0 auto',
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
    padding: 0,
  },
  buttonText: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  mobileStepper: {
    background: 'none',
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
  infoContainer: {
    textAlign: 'left',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 10px 0px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '30px 30px 0px',
    },
  },
  infoAccountNumber: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'unset',
    },
  },
  infoRecipientText: {
    color: '#0029ab',
    fontWeight: 700,
  },
  notifierContainer: {
    padding: '900',
  },
});

/* eslint-disable react/prefer-stateless-function */
class PaymentPage extends React.Component {
  constructor(props) {
    super(props);

    this.getSteps = this.getSteps.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getAuthorizationKey = this.getAuthorizationKey.bind(this);
    this.Auth = new AuthService();
  }

  componentDidMount() {
    if (!this.Auth.loggedIn()) this.props.history.push('/');
    this.props.currency ? null : this.props.getCurrency();
  }

  getAuthorizationKey() {
    if (!this.props.authorizationKeyWithoutMail)
      this.props.getAuthorizationKey();
  }

  getSteps() {
    return [
      <FormattedMessage key={1} {...messages.stepAccountNumber} />,
      <FormattedMessage key={2} {...messages.stepAmountOfMoney} />,
      <FormattedMessage key={3} {...messages.stepTransferTitle} />,
      <FormattedMessage key={4} {...messages.stepConfirmTheData} />,
    ];
  }

  getSuggestionValue = suggestion => suggestion.account_bill;

  renderSuggestion = suggestion => (
    <div>
      {suggestion.account_bill
        .toString()
        .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
        .trim()}
      <br />
      <span className="react-autosuggest__suggestions-list-name">
        {suggestion.user.name} {suggestion.user.surname}
      </span>
    </div>
  );

  getStepContent = step => {
    const {
      value,
      paymentPage,
      onChange,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      onChangeAmountMoney,
      onChangeTransferTitle,
      onChangeAuthorizationKey,
      isSendAuthorizationKey,
      onSendAuthorizationKey,
      authorizationKeyWithoutEmail,
      error,
      message,
      classes,
      intl,
    } = this.props;
    const inputProps = {
      placeholder: intl.formatMessage({
        id: 'app.containers.PaymentPage.inputAccountNumber',
        defaultMessage: 'Search for the account number... *',
      }),
      value,
      onChange,
      maxLength: 26,
      onKeyPress: this.handleKeyPress,
      onKeyDown: this.handleKeyDown,
      type: 'number',
    };

    switch (step) {
      case 0:
        return (
          <Fragment>
            <div className={classes.textField}>
              <FormattedMessage {...messages.stepAccountNumber} />
            </div>

            <Autosuggest
              className={classNames(classes.formItem, {
                [classes.formError]: error,
              })}
              suggestions={paymentPage.suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />

            {error ? <div className={classes.textError}>{error}</div> : null}

            <div className={classes.textMessageSearch}><span className="ba--text-search"><FormattedMessage {...messages.searchInformation} /></span></div>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <div className={classes.textField}>
              <FormattedMessage {...messages.stepAmountOfMoney} />
            </div>
            <FormattedMessage {...messages.inputAmountOfMoney}>
              {placeholder => (
                <input
                  key={1}
                  className={classNames(classes.formItem, {
                    [classes.formError]: error,
                  })}
                  placeholder={placeholder}
                  name="amountMoney"
                  type="number"
                  onChange={onChangeAmountMoney}
                  onKeyPress={this.handleKeyPress}
                  onKeyDown={this.handleKeyDown}
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
              <FormattedMessage {...messages.stepTransferTitle} />
            </div>
            <FormattedMessage {...messages.inputTransferTitle}>
              {placeholder => (
                <input
                  key={2}
                  className={classNames(classes.formItem, {
                    [classes.formError]: error,
                  })}
                  placeholder={placeholder}
                  name="transferTitle"
                  type="text"
                  onChange={onChangeTransferTitle}
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
            <div className={classes.formSubmitContainer}>
              <div
                className={classNames(
                  classes.textField,
                  classes.textFieldAuthorizationCode,
                )}
              >
                <FormattedMessage {...messages.stepConfirmTheData} />
              </div>

              <div className={classes.infoContainer}>
                <div className={classes.infoRecipient}>
                  <span className={classes.infoRecipientText}>
                    <FormattedMessage {...messages.paymentEndAccountNumber} />
                  </span>
                  :{' '}
                  <div className={classes.infoAccountNumber}>
                    {this.props.value
                      .toString()
                      .replace(/(^\d{2}|\d{4})+?/g, '$1 ')
                      .trim()}
                  </div>
                </div>

                <div className={classes.infoRecipient}>
                  <span className={classes.infoRecipientText}>
                    <FormattedMessage {...messages.paymentEndAmountMoney} />
                  </span>
                  :{' '}
                  {this.props.amountMoney
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    .replace('.', ',')}{' '}
                  {this.props.currency}
                </div>

                <div className={classes.infoRecipient}>
                  <span className={classes.infoRecipientText}>
                    <FormattedMessage {...messages.paymentEndTransferTitle} />
                  </span>
                  : {this.props.transferTitle}
                </div>
              </div>

              <br />

              {window.matchMedia('(min-width: 768px)').matches ? (

                <div className="ba--authoriation-code-container">
                <FormattedMessage {...messages.inputAuthorizationCoder}>
                  {placeholder => (
                    <input
                      key={3}
                      className={classNames(
                        classes.formItemAuthCode,
                        classes.formSpecial,
                        {
                          [classes.formError]: error,
                        },
                      )}
                      name="authorizationCode"
                      placeholder={placeholder}
                      type="text"
                      onChange={onChangeAuthorizationKey}
                      onKeyPress={this.handleKeyPress}
                    />
                  )}
                </FormattedMessage>

                {error ? (
                  <div className={classes.textError}>{error}</div>
                ) : null}

                {message ? (
                  <Fragment>
                    <div className={classes.textMessage}>
                      {message}
                      <br />

                      {authorizationKeyWithoutEmail ? (
                        <Fragment>
                          <FormattedMessage {...messages.yourCodeIs} />{' '}
                          {authorizationKeyWithoutEmail}
                        </Fragment>
                      ) : (
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        <span
                          className="noEmailWithoutCode"
                          onClick={this.getAuthorizationKey}
                        >
                          <FormattedMessage {...messages.noEmailWithoutCode} />
                        </span>
                      )}
                    </div>
                  </Fragment>
                ) : null}

                <button
                  type="button"
                  className={classNames(
                    classes.formAuthCode,
                    classes.setAuthorizationCodeBtn,
                  )}
                  onClick={
                    isSendAuthorizationKey ? null : onSendAuthorizationKey
                  }
                >
                  <span className={classes.buttonText}>
                    <FormattedMessage {...messages.inputReceiveCode} />
                  </span>
                </button>
              </div>


              ) : (
                <Fragment>
                <div className="ba--authoriation-code-container">
                <FormattedMessage {...messages.inputAuthorizationCoder}>
                  {placeholder => (
                    <input
                      key={3}
                      className={classNames(
                        classes.formItemAuthCode,
                        classes.formSpecial,
                        {
                          [classes.formError]: error,
                        },
                      )}
                      name="authorizationCode"
                      placeholder={placeholder}
                      type="text"
                      onChange={onChangeAuthorizationKey}
                      onKeyPress={this.handleKeyPress}
                    />
                  )}
                </FormattedMessage>

                <button
                  type="button"
                  className={classNames(
                    classes.formAuthCode,
                    classes.setAuthorizationCodeBtn,
                  )}
                  onClick={
                    isSendAuthorizationKey ? null : onSendAuthorizationKey
                  }
                >
                  <span className={classes.buttonText}>
                    <FormattedMessage {...messages.inputReceiveCode} />
                  </span>
                </button>
              </div>

              {error ? (
                  <div className={classes.textError}>{error}</div>
                ) : null}

                {message ? (
                  <Fragment>
                    <div className={classes.textMessage}>
                      {message}
                      <br />

                      {authorizationKeyWithoutEmail ? (
                        <Fragment>
                          <FormattedMessage {...messages.yourCodeIs} />{' '}
                          {authorizationKeyWithoutEmail}
                        </Fragment>
                      ) : (
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                        <span
                          className="noEmailWithoutCode"
                          onClick={this.getAuthorizationKey}
                        >
                          <FormattedMessage {...messages.noEmailWithoutCode} />
                        </span>
                      )}
                    </div>
                  </Fragment>
                ) : null}

                </Fragment>



              )}

            </div>
          </Fragment>
        );
      default:
        return 'Unknown step';
    }
  };

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.isLoading === false ? this.handleClick(e) : null;
    }
  }

  handleKeyDown(e) {
    e.key === 'e' ? e.preventDefault() : null;
  }

  handleClick(e) {
    e.preventDefault();

    if (this.props.activeStep === 0) {
      this.props.value
        ? this.props.onEnterAccountNumber(this.props.value)
        : this.props.isEmptyAccountNumber(
          <FormattedMessage {...messages.errorAccountNumberEmpty} />,
        );
    }

    if (this.props.activeStep === 1) {
      this.props.amountMoney
        ? this.props.onEnterAmountMoney(this.props.amountMoney)
        : this.props.isEmptyAmountMoney(
          <FormattedMessage {...messages.errorAmountOfMoneyEmpty} />,
        );
    }

    if (this.props.activeStep === 2) {
      this.props.transferTitle
        ? this.props.onEnterTransferTitle(this.props.transferTitle)
        : this.props.isEmptyTransferTitle(
          <FormattedMessage {...messages.errorTransferTitleIncorrect} />,
        );
    }

    if (this.props.activeStep === 3) {
      this.props.authorizationKey
        ? this.props.onEnterAuthorizationKey(this.props.authorizationKey)
        : this.props.isEmptyAuthorizationKey(
          <FormattedMessage {...messages.errorKeyIncorrect} />,
        );
    }
  }

  render() {
    const { classes, activeStep, onPaymentStepBack, isLoading } = this.props;

    return (
      <Fragment>
        <FormattedMessage {...messages.helmetPaymentTitle}>
          {title => <Helmet title={title} />}
        </FormattedMessage>

        <div className={classes.center}>
          <MobileStepper
            variant="dots"
            steps={4}
            position="static"
            activeStep={activeStep}
            classes={{
              root: classes.mobileStepper,
              dots: classes.mobileStepperDots,
            }}
          />
          <Stepper className={classes.stepperContainer} activeStep={activeStep}>
            {this.getSteps().map(label => {
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
            {activeStep === this.getSteps().length ? null : (
              <div>
                <div className={classes.instructions}>
                  <form noValidate autoComplete="off">
                    {this.getStepContent(activeStep)}
                  </form>
                </div>
                {activeStep === this.getSteps().length - 1 ? (
                  <button
                    className={classes.formSubmit}
                    type="submit"
                    onClick={this.handleClick}
                    disabled={isLoading}
                  >
                    <span className={classes.buttonText}>
                      <FormattedMessage {...messages.inputMakePayment} />
                    </span>
                  </button>
                ) : (
                  [
                    activeStep === 0 ? (
                      <button
                        key={1}
                        type="button"
                        className={classes.formSubmit}
                        disabled={isLoading}
                        onClick={this.handleClick}
                      >
                        <span className={classes.buttonText}>
                          <FormattedMessage {...messages.nextText} />
                        </span>
                        <NavigateNext />
                      </button>
                    ) : activeStep === 1 ? (
                      <button
                        type="button"
                        key={2}
                        className={classes.formSubmit}
                        disabled={isLoading}
                        onClick={this.handleClick}
                      >
                        <span className={classes.buttonText}>
                          <FormattedMessage {...messages.nextText} />
                        </span>
                        <NavigateNext />
                      </button>
                    ) : (
                      <button
                        type="button"
                        key={3}
                        className={classes.formSubmit}
                        onClick={this.handleClick}
                        disabled={isLoading}
                      >
                        <span className={classes.buttonText}>
                          <FormattedMessage {...messages.nextText} />
                        </span>
                        <NavigateNext />
                      </button>
                    ),
                  ]
                )}

                {activeStep !== 0 ? (
                  <button
                    type="button"
                    disabled={activeStep === 0}
                    onClick={onPaymentStepBack}
                  >
                    <NavigateBefore />
                    <span className={classes.buttonText}>
                      <FormattedMessage {...messages.backText} />
                    </span>
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <Warning />
        <Notifier className={classes.notifierContainer} />
        <Copyright />
      </Fragment>
    );
  }
}

PaymentPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  accountBills: makeAccountBillsSelector(),
  accountNumber: makeAccountNumberSelector(),
  amountMoney: makeAmountMoneySelector(),
  transferTitle: makeTransferTitleSelector(),
  authorizationKey: makeAuthorizationKeySelector(),
  activeStep: makeActiveStepSelector(),
  isLoading: makeIsLoadingSelector(),
  message: makeMessageSelector(),
  error: makeErrorSelector(),
  value: makeValueSelector(),
  paymentPage: makeSelectPaymentPage(),
  isSendAuthorizationKey: makeIsSendAuthorizationKeySelector(),
  currency: makeCurrencySelector(),
  authorizationKeyWithoutEmail: makeAuthorizationKeyWithoutEmailSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCurrency: () => dispatch(getCurrencyAction()),
    getAuthorizationKey: () => dispatch(getAuthorizationKeyAction()),
    isEmptyAccountNumber: error => dispatch(emptyAccountNumberAction(error)),
    isEmptyAmountMoney: error => dispatch(emptyAmountNumberAction(error)),
    isEmptyTransferTitle: error => dispatch(emptyTransferTitleAction(error)),
    isEmptyAuthorizationKey: error =>
      dispatch(emptyAuthorizationKeyAction(error)),
    onChangeAmountMoney: e =>
      dispatch(changeAmountMoneyAction(parseFloat(e.target.value))),
    onChangeTransferTitle: e =>
      dispatch(changeTransferTitleAction(e.target.value)),
    onChangeAuthorizationKey: e =>
      dispatch(changeAuthorizationKeyAction(e.target.value)),
    onEnterAccountNumber: value => dispatch(enterAccountNumberAction(value)),
    onEnterAmountMoney: amountMoney =>
      dispatch(enterAmountMoneyAction(parseFloat(amountMoney.toFixed(2)))),
    onEnterTransferTitle: transferTitle =>
      dispatch(enterTransferTitleAction(transferTitle)),
    onSendAuthorizationKey: () => dispatch(sendAuthorizationKeyAction()),
    onEnterAuthorizationKey: authorizationKey =>
      dispatch(enterAuthorizationKeyAction(authorizationKey)),
    onPaymentStepNext: () => dispatch(paymentStepNextAction()),
    onPaymentStepBack: () => dispatch(paymentStepBackAction()),
    onChange(event, { newValue }) {
      dispatch(changeAccountNumberAction(newValue));
    },
    onSuggestionsFetchRequested({ value }) {
      dispatch(searchAccountBillsAction(value));
    },
    onSuggestionsClearRequested() {
      dispatch(clearAccountBillsAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'paymentPage', reducer });
const withSaga = injectSaga({ key: 'paymentPage', saga });

export default compose(
  withStyles(styles, { withTheme: true }),
  withReducer,
  withSaga,
  withConnect,
  withSnackbar,
  injectIntl,
)(PaymentPage);
