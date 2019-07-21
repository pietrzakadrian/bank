/**
 *
 * Notifications
 *
 */

import React, { Fragment } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

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

//  Import Selectors
import {
  makeIsOpenNotificationsSelector,
  makeNotificationsSelector,
} from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  isOpenNotifications: makeIsOpenNotificationsSelector(),
  notifications: makeNotificationsSelector(),
});

export default function Notifications() {
  const { isOpenNotifications, notifications } = useSelector(stateSelector);
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
