/**
 *
 * LoginForm
 *
 */

import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

// Import Components
import FormWrapper from 'components/FormWrapper';
import LabelWrapper from 'components/LabelWrapper';
import InputWrapper from 'components/InputWrapper';
import ButtonWrapper from 'components/ButtonWrapper';
import ButtonBackWrapper from 'components/ButtonBackWrapper';
import NavigateNextIcon from 'components/NavigateNextIcon';
import NavigateBackIcon from 'components/NavigateBackIcon';
import messages from './messages';

// Import Actions
import {
  changeLoginAction,
  changePasswordAction,
  enterLoginAction,
  enterPasswordAction,
  stepBackAction,
} from 'containers/LoginPage/actions';

// Import Selectors
import {
  makeLoginSelector,
  makePasswordSelector,
  makeErrorSelector,
  makeActiveStepSelector,
  makeIsLoadingSelector,
} from 'containers/LoginPage/selectors';

const stateSelector = createStructuredSelector({
  login: makeLoginSelector(),
  password: makePasswordSelector(),
  error: makeErrorSelector(),
  activeStep: makeActiveStepSelector(),
  isLoading: makeIsLoadingSelector(),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const onChangeLogin = e =>
    dispatch(changeLoginAction(parseInt(e.target.value, 10)));
  const onChangePassword = e => dispatch(changePasswordAction(e.target.value));
  const onEnterLogin = login => dispatch(enterLoginAction(parseInt(login, 10)));
  const onEnterPassword = password => dispatch(enterPasswordAction(password));
  const handleStepBack = () => dispatch(stepBackAction());
  const handleKeyPress = e =>
    (e.key === 'E' || e.key === 'e') && e.preventDefault();
  const handleKeyDown = (e, password) =>
    e.key === 'Enter' &&
    (e.preventDefault(),
    !password ? dispatch(enterLoginAction()) : dispatch(enterPasswordAction()));
  const { login, password, error, activeStep, isLoading } = useSelector(
    stateSelector,
  );

  return (
    <FormWrapper>
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

            {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

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

            {error && <LabelWrapper error={error}>{error}</LabelWrapper>}

            <ButtonWrapper
              type="button"
              onClick={() => onEnterPassword(password)}
              disabled={isLoading}
            >
              <FormattedMessage {...messages.inputLogin} />
            </ButtonWrapper>

            <ButtonBackWrapper
              type="button"
              onClick={handleStepBack}
              disabled={isLoading}
            >
              <NavigateBackIcon />
              <FormattedMessage {...messages.backText} />
            </ButtonBackWrapper>
          </Fragment>
        )}
      </form>
    </FormWrapper>
  );
}
