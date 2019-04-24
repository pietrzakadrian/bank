/* eslint-disable no-nested-ternary */
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// Import Components
import LoadingCircular from 'components/App/LoadingCircular';

import { FormattedMessage } from 'react-intl';
import { makeIsNotificationOpenSelector } from 'components/App/Header/selectors';
import {
  makeIsNewNotificationSelector,
  makeUserIdSelector,
  makeNotificationCountSelector,
  makeNewNotificationsSelector,
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
    const {
      classes,
      isNotificationOpen,
      isNewNotification,
      newNotifications,
      notificationCount,
    } = this.props;
    // const socket = socketIOClient('/');

    // try {
    //   socket.on('new notification', id => {
    //     id === this.props.userId ? this.props.getUserdata() : null;
    //   });
    // } catch (e) {
    //   /* just ignore */
    // }
    return (
      <div
        style={{
          display: isNotificationOpen ? 'block' : 'none',
        }}
        className="arrow_box"
      >
        <div className="no-test">
          {/* {newNotifications.map(newNotification =>
            console.log(newNotification.sender_name),
          )} */}
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
  newNotifications: makeNewNotificationsSelector(),
  userId: makeUserIdSelector(),
});

export default withStyles(styles)(connect(mapStateToProps)(Notification));
