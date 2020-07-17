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
import NotificationContainer from './NotificationContainer';
import NotificationsWrapper from './NotificationsWrapper';
import TextWrapper from './TextWrapper';
import SenderWrapper from 'components/App/SenderWrapper';
import messages from './messages';
import NotificationWrapper from './NotificationWrapper';
import AmountWrapper from 'components/App/AmountWrapper';
import DateWrapper from 'components/App/DateWrapper';
import {
  WidgetBeamWrapper,
  WidgetBeamCounter,
  WidgetBeamButton,
} from 'components/App/WidgetBeam';

// Import Actions
import { unsetManualNewNotificationsAction } from 'containers/App/actions';

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
  const dispatch = useDispatch();
  const onManualUnsetNotifications = () =>
    dispatch(unsetManualNewNotificationsAction());
  const { isOpenNotifications, notifications } = useSelector(stateSelector);

  return (
    <NotificationsWrapper
      open={isOpenNotifications}
      onClick={e => e.stopPropagation()}
    >
      {notifications.length ? (
        <Fragment>
          <WidgetBeamWrapper>
            <WidgetBeamCounter>
              <FormattedMessage {...messages.numberOfNotifications} />{' '}
              {notifications.length}
            </WidgetBeamCounter>
            <WidgetBeamButton onClick={onManualUnsetNotifications}>
              <FormattedMessage {...messages.markAsRead} />
            </WidgetBeamButton>
          </WidgetBeamWrapper>
          <NotificationContainer>
            <Table>
              <TableBody>
                {notifications.map(notification => (
                  <TableRow key={notification.notification_id}>
                    <Fragment>
                      <TableCell>
                        <NotificationWrapper>
                          <FormattedMessage {...messages.getTrasnfer} />{' '}
                          <SenderWrapper>
                            {notification.sender_name}
                          </SenderWrapper>{' '}
                          <FormattedMessage {...messages.worth} />{' '}
                          <AmountWrapper>
                            {notification.amount_money}
                          </AmountWrapper>
                          <DateWrapper>{notification.date_time}</DateWrapper>
                        </NotificationWrapper>
                      </TableCell>
                    </Fragment>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </NotificationContainer>
        </Fragment>
      ) : (
        <TextWrapper>
          <FormattedMessage {...messages.noNotifications} />
        </TextWrapper>
      )}
    </NotificationsWrapper>
  );
}
