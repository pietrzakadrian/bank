/**
 *
 * CurrencyAlert
 *
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';
import saga from 'containers/SettingsPage/saga';
import reducer from 'containers/SettingsPage/reducer';

// Import Components
import AlertTitleWrapper from './AlertTitleWrapper';
import AlertContentWrapper from './AlertContentWrapper';
import AlertActionsWrapper from './AlertActionsWrapper';
import AlertButtonWrapper from './AlertButtonWrapper';
import AlertDialogWrapper from './AlertDialogWrapper';
import messages from './messages';

// Import Actions
import {
  toggleAlertCurrencyAction,
  enterNewCurrencyAction,
} from 'containers/SettingsPage/actions';

// Import Selectors
import {
  makeIsOpenAlertSelector,
  makeCurrencyIdSelector,
} from 'containers/SettingsPage/selectors';

const stateSelector = createStructuredSelector({
  isOpenAlert: makeIsOpenAlertSelector(),
  currencyId: makeCurrencyIdSelector(),
});

const key = 'settingsPage';

export default function CurrencyAlert() {
  const dispatch = useDispatch();
  const onToggleCurrencyAlert = () => dispatch(toggleAlertCurrencyAction());
  const onEnterNewCurrency = currencyId =>
    dispatch(enterNewCurrencyAction(currencyId));
  const { isOpenAlert, currencyId } = useSelector(stateSelector);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <AlertDialogWrapper
      classes={{ paper: 'paper' }}
      open={isOpenAlert}
      onClose={onToggleCurrencyAlert}
    >
      <AlertTitleWrapper>
        <FormattedMessage {...messages.contentTitle} />
      </AlertTitleWrapper>
      <AlertContentWrapper>
        <FormattedMessage {...messages.contentAlert} />
      </AlertContentWrapper>
      <AlertActionsWrapper>
        <AlertButtonWrapper onClick={onToggleCurrencyAlert}>
          <FormattedMessage {...messages.disagree} />
        </AlertButtonWrapper>
        <AlertButtonWrapper
          color="primary"
          onClick={() => onEnterNewCurrency(currencyId)}
          autoFocus
        >
          <FormattedMessage {...messages.agree} />
        </AlertButtonWrapper>
      </AlertActionsWrapper>
    </AlertDialogWrapper>
  );
}
