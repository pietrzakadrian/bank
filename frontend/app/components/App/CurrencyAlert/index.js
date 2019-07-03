/**
 *
 * CurrencyAlert
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import saga from 'containers/SettingsPage/saga';
import reducer from 'containers/SettingsPage/reducer';
import {
  makeIsOpenAlertSelector,
  makeCurrencyIdSelector,
} from 'containers/SettingsPage/selectors';
import {
  toggleAlertCurrencyAction,
  enterNewCurrencyAction,
} from 'containers/SettingsPage/actions';
import AlertTitleWrapper from './AlertTitleWrapper';
import AlertContentWrapper from './AlertContentWrapper';
import AlertActionsWrapper from './AlertActionsWrapper';
import AlertButtonWrapper from './AlertButtonWrapper';
import AlertDialogWrapper from './AlertDialogWrapper';
import messages from './messages';

function CurrencyAlert({
  isOpenAlert,
  currencyId,
  onToggleCurrencyAlert,
  onEnterNewCurrency,
}) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });

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

CurrencyAlert.propTypes = {
  isOpenAlert: PropTypes.bool,
  currencyId: PropTypes.number,
  onToggleCurrencyAlert: PropTypes.func,
  onEnterNewCurrency: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpenAlert: makeIsOpenAlertSelector(),
  currencyId: makeCurrencyIdSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onToggleCurrencyAlert: () => dispatch(toggleAlertCurrencyAction()),
    onEnterNewCurrency: currencyId =>
      dispatch(enterNewCurrencyAction(currencyId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CurrencyAlert);
