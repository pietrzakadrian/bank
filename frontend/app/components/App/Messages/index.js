/**
 *
 * Messages
 *
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Components
import MessagesWrapper from './MessagesWrapper';
import TextWrapper from './TextWrapper';
import messages from './messages';

// Import Selectors
import { makeIsOpenMessagesSelector } from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  isOpenMessages: makeIsOpenMessagesSelector(),
});

export default function Messages() {
  const { isOpenMessages } = useSelector(stateSelector);

  return (
    <MessagesWrapper open={isOpenMessages}>
      <TextWrapper>
        <FormattedMessage {...messages.noMessages} />
      </TextWrapper>
    </MessagesWrapper>
  );
}
