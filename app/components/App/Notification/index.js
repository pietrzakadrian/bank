/**
 *
 * Notification
 *
 */

import React from 'react';
import './styles.css';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

// Import Material UI
import { withStyles } from '@material-ui/core';

import { FormattedMessage } from 'react-intl';
import { makeIsNotificationOpenSelector } from 'components/App/Header/selectors';
import {
  makeIsNewNotificationSelector,
  makeUserIdSelector,
  makeNotificationCountSelector,
} from 'containers/App/selectors';
import messages from './messages';

const styles = {};

class Notification extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.isNewNotification !== prevProps.isNewNotification) {
      console.log('notificationCount', prevProps.notificationCount);
    }
  }

  render() {
    const { classes, isNotificationOpen, isNewNotification } = this.props;
    const socket = socketIOClient('/');

    try {
      socket.on('new notification', id => {
        id === this.props.userId ? this.props.getUserdata() : null;
      });
    } catch (e) {
      /* just ignore */
    }
    return (
      <div
        style={{
          display: isNotificationOpen ? 'block' : 'none',
        }}
        className="arrow_box"
      >
        <div className="no-notification">
          <FormattedMessage {...messages.noNotification} />
        </div>
      </div>
    );
  }
}

Notification.propTypes = {};

const mapStateToProps = createStructuredSelector({
  isNotificationOpen: makeIsNotificationOpenSelector(),
  isNewNotification: makeIsNewNotificationSelector(),
  notificationCount: makeNotificationCountSelector(),
  userId: makeUserIdSelector(),
});

export default withStyles(styles)(connect(mapStateToProps)(Notification));
