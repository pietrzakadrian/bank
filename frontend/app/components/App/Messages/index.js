/**
 *
 * Messages
 *
 */

import React, { Fragment } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import messagesUser from './messages';

// Import Components
import DateWrapper from 'components/App/DateWrapper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MessageContainer from './MessageContainer';
import MessagesWrapper from './MessagesWrapper';
import SenderWrapper from 'components/App/SenderWrapper';
import TextWrapper from './TextWrapper';
import MessageBottonLine from './MessageBottonLine';
import {
  WidgetBeamWrapper,
  WidgetBeamCounter,
} from 'components/App/WidgetBeam';
import MessageWrapper from './MessageWrapper';
import MessageModal from 'components/App/MessageModal';

// Import Actions
import { toggleMessageModalAction } from 'containers/App/actions';

// Import Selectors
import {
  makeIsOpenMessagesSelector,
  makeMessagesSelector,
} from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  isOpenMessages: makeIsOpenMessagesSelector(),
  messages: makeMessagesSelector(),
});

export default function Messages() {
  const dispatch = useDispatch();
  const onToggleMessageModal = () => dispatch(toggleMessageModalAction());
  const { isOpenMessages, messages } = useSelector(stateSelector);

  return (
    <MessagesWrapper open={isOpenMessages} onClick={e => e.stopPropagation()}>
      {messages.length ? (
        <Fragment>
          <WidgetBeamWrapper>
            <WidgetBeamCounter>
              <FormattedMessage {...messagesUser.numberOfMessages} /> 1
            </WidgetBeamCounter>
          </WidgetBeamWrapper>
          <MessageContainer>
            <Table>
              <TableBody>
                {messages.map(message => (
                  <TableRow
                    key={message.messageId}
                    onClick={onToggleMessageModal}
                  >
                    <Fragment>
                      <TableCell>
                        <MessageWrapper>
                          {message.messageTeaser}
                          <MessageBottonLine>
                            <DateWrapper>{message.createdDate}</DateWrapper>
                            <div>
                              <FormattedMessage {...messagesUser.getMessage} />{' '}
                              <SenderWrapper>
                                {message.senderName}
                              </SenderWrapper>
                            </div>
                          </MessageBottonLine>
                          <MessageModal message={message} />
                        </MessageWrapper>
                      </TableCell>
                    </Fragment>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </MessageContainer>
        </Fragment>
      ) : (
        <TextWrapper>
          <FormattedMessage {...messagesUser.noMessages} />
        </TextWrapper>
      )}
    </MessagesWrapper>
  );
}
