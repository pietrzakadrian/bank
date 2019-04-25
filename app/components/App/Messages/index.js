/* eslint-disable react/prefer-stateless-function */
/**
 *
 * Message
 *
 */

import React from 'react';
import './styles.css';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { makeIsMessagesOpenSelector } from 'components/App/Header/selectors';

import messages from './messages';

class Messages extends React.Component {
  render() {
    const { isMessagesOpen } = this.props;

    return (
      <div
        style={{
          display: isMessagesOpen ? 'block' : 'none',
        }}
        className="arrow_box-message"
      >
        <div className="no-message">
          <FormattedMessage {...messages.noMessages} />
        </div>
      </div>
    );
  }
}

Messages.propTypes = {};

const mapStateToProps = createStructuredSelector({
  isMessagesOpen: makeIsMessagesOpenSelector(),
});

export default connect(mapStateToProps)(Messages);
