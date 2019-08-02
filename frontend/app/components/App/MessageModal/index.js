/**
 *
 * CurrencyAlert
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';

// Import Components
import AlertTitleWrapper from './AlertTitleWrapper';
import AlertContentWrapper from './AlertContentWrapper';
import AlertActionsWrapper from './AlertActionsWrapper';
import AlertButtonWrapper from './AlertButtonWrapper';
import AlertDialogWrapper from './AlertDialogWrapper';

// Import Actions
import { toggleMessageModalAction } from 'containers/App/actions';

// Import Selectors
import { makeIsOpenMessageModalSelector } from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  isOpenMessageModal: makeIsOpenMessageModalSelector(),
});

export default function MessageModal({ message }) {
  const dispatch = useDispatch();
  const onToggleMessageModal = () => dispatch(toggleMessageModalAction());
  const { isOpenMessageModal } = useSelector(stateSelector);
  const { messageActions, messageContent, messageSubject } = message;

  return (
    <AlertDialogWrapper
      classes={{ paper: 'paper' }}
      open={isOpenMessageModal}
      onClose={onToggleMessageModal}
    >
      <AlertTitleWrapper>{messageSubject}</AlertTitleWrapper>
      <AlertContentWrapper
        dangerouslySetInnerHTML={{ __html: messageContent }}
        onClick={e => e.stopPropagation()}
      ></AlertContentWrapper>
      <AlertActionsWrapper>
        <AlertButtonWrapper>{messageActions}</AlertButtonWrapper>
      </AlertActionsWrapper>
    </AlertDialogWrapper>
  );
}

MessageModal.propTypes = {
  message: PropTypes.shape({
    messageActions: PropTypes.string.isRequired,
    messageContent: PropTypes.string.isRequired,
    messageSubject: PropTypes.string.isRequired,
  }).isRequired,
};
