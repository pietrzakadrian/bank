/**
 *
 * Notifications
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  makeIsOpenNotificationsSelector,
  makeNotificationsSelector,
} from 'containers/App/selectors';

// Import Components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NotificationsWrapper from './NotificationsWrapper';
import TextWrapper from './TextWrapper';
import SenderWrapper from './SenderWrapper';
import messages from './messages';
import NotificationWrapper from './NotificationWrapper';
import AmountWrapper from './AmountWrapper';
import DateWrapper from './DateWrapper';

function Notifications({ isOpenNotifications, notifications }) {
  let id = 0;
  return (
    <NotificationsWrapper open={isOpenNotifications}>
      {notifications.length ? (
        <Table>
          <TableBody>
            {notifications.map(notification => (
              <TableRow key={id++}>
                <Fragment>
                  <TableCell>
                    <NotificationWrapper>
                      <FormattedMessage {...messages.getTrasnfer} />{' '}
                      <SenderWrapper>{notification.sender_name}</SenderWrapper>{' '}
                      <FormattedMessage {...messages.worth} />{' '}
                      <AmountWrapper>{notification.amount_money}</AmountWrapper>
                      <DateWrapper>{notification.date_time}</DateWrapper>
                    </NotificationWrapper>
                  </TableCell>
                </Fragment>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <TextWrapper>
          <FormattedMessage {...messages.noNotifications} />
        </TextWrapper>
      )}
    </NotificationsWrapper>
  );
}

Notifications.propTypes = {
  isOpenNotifications: PropTypes.bool,
  notifications: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  isOpenNotifications: makeIsOpenNotificationsSelector(),
  notifications: makeNotificationsSelector(),
});

export default connect(mapStateToProps)(Notifications);
