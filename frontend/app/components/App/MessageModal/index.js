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
        You're very nice.

      </AlertTitleWrapper>
      <AlertContentWrapper>
        <FormattedMessage {...messages.part1} />
        <FormattedMessage {...messages.part2} />
        <FormattedMessage {...messages.part3} />
        <FormattedMessage {...messages.part4} />
        <FormattedMessage {...messages.part5} />
        <FormattedMessage {...messages.part6} />
        <FormattedMessage {...messages.part7} />
        <FormattedMessage {...messages.part8} />
        <FormattedMessage {...messages.part9} />
        <FormattedMessage {...messages.part10} />
        <FormattedMessage {...messages.part11} />
        <FormattedMessage {...messages.part12} />
        <FormattedMessage {...messages.part13} />
        <br />
        <FormattedMessage {...messages.part14} />


      </AlertContentWrapper>
      <AlertActionsWrapper>
        <AlertButtonWrapper onClick={onToggleMessageModal}>
          <FormattedMessage {...messages.disagree} />
        </AlertButtonWrapper>
      </AlertActionsWrapper>
    </AlertDialogWrapper>
  );
}
