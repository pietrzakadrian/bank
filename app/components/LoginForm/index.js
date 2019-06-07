/**
 *
 * LoginForm
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  makeLoginSelector,
  makePasswordSelector,
  makeErrorSelector,
  makeActiveStepSelector,
  makeIsLoadingSelector,
} from 'containers/LoginPage/selectors';
import {
  changeLoginAction,
  changePasswordAction,
  enterLoginAction,
  enterPasswordAction,
  stepBackAction,
} from 'containers/LoginPage/actions';
import messages from './messages';

import LoginFormWrapper from './LoginFormWrapper';
import LabelWrapper from './LabelWrapper';
import InputWrapper from './InputWrapper';
import ButtonWrapper from './ButtonWrapper';
import ButtonBackWrapper from './ButtonBackWrapper';
import NavigateNextIcon from './NavigateNextIcon';
import NavigateBackIcon from './NavigateBackIcon';

function LoginForm({
  login,
  password,
  error,
  activeStep,
  isLoading,
  onChangeLogin,
  onChangePassword,
  onEnterLogin,
  onEnterPassword,
  onStepBack,
  handleKeyDown,
  handleKeyPress,
}) {
  return (
    <LoginFormWrapper>
      <form noValidate autoComplete="off">
        {activeStep === 0 ? (
          <Fragment>
            <LabelWrapper>
              <FormattedMessage {...messages.numberId} />
            </LabelWrapper>

            <FormattedMessage {...messages.inputNumber}>
              {placeholder => (
                <InputWrapper
                  key={1}
                  placeholder={placeholder}
                  type="number"
                  value={login || ''}
                  error={error}
                  onChange={onChangeLogin}
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress}
                />
              )}
            </FormattedMessage>

            {error ? <LabelWrapper error={error}>{error}</LabelWrapper> : null}

            <ButtonWrapper
              type="button"
              onClick={onEnterLogin}
              disabled={isLoading}
            >
              <FormattedMessage {...messages.nextText} />
              <NavigateNextIcon />
            </ButtonWrapper>
          </Fragment>
        ) : (
          <Fragment>
            <LabelWrapper>
              <FormattedMessage {...messages.accessCode} />
            </LabelWrapper>

            <FormattedMessage {...messages.inputPassowrd}>
              {placeholder => (
                <InputWrapper
                  key={2}
                  placeholder={placeholder}
                  type="password"
                  value={password || ''}
                  error={error}
                  onChange={onChangePassword}
                  onKeyDown={e => handleKeyDown(e, password)}
                />
              )}
            </FormattedMessage>

            {error ? <LabelWrapper error={error}>{error}</LabelWrapper> : null}

            <ButtonWrapper
              type="button"
              onClick={onEnterPassword}
              disabled={isLoading}
            >
              <FormattedMessage {...messages.inputLogin} />
            </ButtonWrapper>

            <ButtonBackWrapper
              type="button"
              onClick={onStepBack}
              disabled={isLoading}
            >
              <NavigateBackIcon />
              <FormattedMessage {...messages.backText} />
            </ButtonBackWrapper>
          </Fragment>
        )}
      </form>
    </LoginFormWrapper>
  );
}

LoginForm.propTypes = {
  login: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  activeStep: PropTypes.number,
  isLoading: PropTypes.bool,
  onChangeLogin: PropTypes.func,
  onChangePassword: PropTypes.func,
  onEnterLogin: PropTypes.func,
  onEnterPassword: PropTypes.func,
  onStepBack: PropTypes.func,
  handleKeyDown: PropTypes.func,
  handleKeyPress: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: makeLoginSelector(),
  password: makePasswordSelector(),
  error: makeErrorSelector(),
  activeStep: makeActiveStepSelector(),
  isLoading: makeIsLoadingSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeLogin: e => dispatch(changeLoginAction(e.target.value)),
    onChangePassword: e => dispatch(changePasswordAction(e.target.value)),
    onEnterLogin: () => dispatch(enterLoginAction()),
    onEnterPassword: () => dispatch(enterPasswordAction()),
    onStepBack: () => dispatch(stepBackAction()),
    handleKeyPress: e => e.key === 'e' && e.preventDefault(),
    handleKeyDown: (e, password) =>
      e.key === 'Enter' &&
      (e.preventDefault(),
      !password
        ? dispatch(enterLoginAction())
        : dispatch(enterPasswordAction())),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginForm);
