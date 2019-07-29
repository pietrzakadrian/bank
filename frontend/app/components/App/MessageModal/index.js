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

// Import Components
import AlertTitleWrapper from './AlertTitleWrapper';
import AlertContentWrapper from './AlertContentWrapper';
import AlertActionsWrapper from './AlertActionsWrapper';
import AlertButtonWrapper from './AlertButtonWrapper';
import AlertDialogWrapper from './AlertDialogWrapper';
import messages from './messages';

// Import Actions
import { toggleMessageModalAction } from 'containers/App/actions';

// Import Selectors
import { makeIsOpenMessageModalSelector } from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  isOpenMessageModal: makeIsOpenMessageModalSelector(),
});

export default function MessageModal() {
  const dispatch = useDispatch();
  const onToggleMessageModal = () => dispatch(toggleMessageModalAction());
  const { isOpenMessageModal } = useSelector(stateSelector);

  return (
    <AlertDialogWrapper
      classes={{ paper: 'paper' }}
      open={isOpenMessageModal}
      onClose={onToggleMessageModal}
    >
      <AlertTitleWrapper>
        {/* <FormattedMessage {...messages.contentTitle} /> */}
      </AlertTitleWrapper>
      <AlertContentWrapper>
        {/* <FormattedMessage {...messages.contentAlert} /> */}
      </AlertContentWrapper>
      <AlertActionsWrapper>
        <AlertButtonWrapper onClick={onToggleMessageModal}>
          {/* <FormattedMessage {...messages.disagree} /> */}
        </AlertButtonWrapper>
        <AlertButtonWrapper color="primary" autoFocus>
          {/* <FormattedMessage {...messages.agree} /> */}
        </AlertButtonWrapper>
      </AlertActionsWrapper>
    </AlertDialogWrapper>
  );
}
