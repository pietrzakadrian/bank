/**
 *
 * Messages
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { makeIsOpenMessagesSelector } from 'containers/App/selectors';
import MessagesWrapper from './MessagesWrapper';
import messages from './messages';
import TextWrapper from './TextWrapper';

function Messages({ isMessagesOpen }) {
  return (
    <MessagesWrapper open={isMessagesOpen}>
      <TextWrapper>
        <FormattedMessage {...messages.noMessages} />
      </TextWrapper>
    </MessagesWrapper>
  );
}

Messages.propTypes = {
  isMessagesOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isMessagesOpen: makeIsOpenMessagesSelector(),
});

export default connect(mapStateToProps)(Messages);
