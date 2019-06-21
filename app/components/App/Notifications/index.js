/**
 *
 * Notifications
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { makeIsOpenNotificationsSelector } from 'containers/App/selectors';

// Import Components
import NotificationsWrapper from './NotificationsWrapper';
import TextWrapper from './TextWrapper';
import messages from './messages';

function Notifications({ isOpenNotifications }) {
  return (
    <NotificationsWrapper open={isOpenNotifications}>
      <TextWrapper>
        <FormattedMessage {...messages.noNotifications} />
      </TextWrapper>
    </NotificationsWrapper>
  );
}

Notifications.propTypes = {
  isOpenNotifications: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isOpenNotifications: makeIsOpenNotificationsSelector(),
});

export default connect(mapStateToProps)(Notifications);
