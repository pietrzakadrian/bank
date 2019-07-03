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

// Import Components
import MessagesWrapper from './MessagesWrapper';
import TextWrapper from './TextWrapper';
import messages from './messages';

function Messages({ isOpenMessages }) {
  return (
    <MessagesWrapper open={isOpenMessages}>
      <TextWrapper>
        <FormattedMessage {...messages.noMessages} />
      </TextWrapper>
    </MessagesWrapper>
  );
}

Messages.propTypes = {
  isOpenMessages: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isOpenMessages: makeIsOpenMessagesSelector(),
});

export default connect(mapStateToProps)(Messages);
