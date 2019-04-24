/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-nested-ternary */
/**
 *
 * Notification
 *
 */

import React, { Fragment } from 'react';
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
  constructor(props) {
    super(props);

    this.state = {
      newNotifications: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // todo: make test!
    if (this.props.isNewNotification !== prevProps.isNewNotification) {
      if (!this.state.newNotifications) {
        this.setState({
          newNotifications: prevProps.newNotifications,
        });
      } else if (this.state.newNotifications) {
        this.setState({
          newNotifications: prevState.newNotifications.concat(
            prevProps.newNotifications,
          ),
        });
      }
    }
  }

  render() {
    const { classes, isNotificationOpen } = this.props;
    const { newNotifications } = this.state;

    return (
      <div
        style={{
          display: isNotificationOpen ? 'block' : 'none',
        }}
        className="arrow_box"
      >
        {newNotifications ? (
          <div className="no-test">
            <Table>
              <TableBody>
                {newNotifications.map((newNotification, id) => (
                  <TableRow key={id++}>
                    <Fragment>
                      <TableCell>
                        <span>
                          You received a cash transfer from{' '}
                          <span className="notification_sender">
                            {newNotification.sender_name}
                          </span>{' '}
                          worth{' '}
                          <span className="notification_amount">
                            {newNotification.amount_money}
                          </span>
                        </span>
                        <br />
                        <span className="notification_date">
                          {newNotification.date_time}
                        </span>
                      </TableCell>
                    </Fragment>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="no-notification">
            <FormattedMessage {...messages.noNotification} />
          </div>
        )}
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
