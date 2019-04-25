/* eslint-disable no-lonely-if */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-nested-ternary */
/**
 *
 * Notifications
 *
 */

import React, { Fragment } from 'react';
import './styles.css';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

// Import Material UI
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { FormattedMessage } from 'react-intl';
import { makeIsNotificationsOpenSelector } from 'components/App/Header/selectors';
import {
  makeIsNewNotificationSelector,
  makeUserIdSelector,
  makeNotificationCountSelector,
  makeNewNotificationsSelector,
} from 'containers/App/selectors';
import messages from './messages';

const styles = {};

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newNotifications: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isNewNotification !== prevProps.isNewNotification) {
      let newNotifications;
      if (!this.state.newNotifications) {
        this.setState({
          newNotifications: prevProps.newNotifications,
        });
      } else {
        if (prevProps.newNotifications) {
          newNotifications = prevProps.newNotifications.concat(
            this.state.newNotifications,
          );
          // newNotifications = this.state.newNotifications.concat(
          //   prevProps.newNotifications,
          // );
          // console.log('newNotifications', newNotifications);
          this.setState({ newNotifications });
        }
      }
    }
  }

  render() {
    const { isNotificationsOpen } = this.props;
    const { newNotifications } = this.state;

    return (
      <div
        style={{
          display: isNotificationsOpen ? 'block' : 'none',
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
            <FormattedMessage {...messages.noNotifications} />
          </div>
        )}
      </div>
    );
  }
}

Notifications.propTypes = {};

const mapStateToProps = createStructuredSelector({
  isNotificationsOpen: makeIsNotificationsOpenSelector(),
  isNewNotification: makeIsNewNotificationSelector(),
  notificationCount: makeNotificationCountSelector(),
  newNotifications: makeNewNotificationsSelector(),
  userId: makeUserIdSelector(),
});

export default withStyles(styles)(connect(mapStateToProps)(Notifications));
