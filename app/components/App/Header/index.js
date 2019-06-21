/**
 *
 * Header
 *
 */

import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import ResizeObserver from 'react-resize-observer';
import MediaQuery from 'react-responsive';
import { FormattedMessage } from 'react-intl';
import {
  makeIsOpenNavigationMobileSelector,
  makeIsOpenNavigationDesktopSelector,
  makeIsOpenNotificationsSelector,
  makeIsOpenMessagesSelector,
  makeIsNewNotificationsSelector,
  makeIsNewMessagesSelector,
} from 'containers/App/selectors';
import {
  toggleNavigationDesktopAction,
  toggleNavigationMobileAction,
  logoutAction,
  toggleMessagesAction,
  toggleNotificationsAction,
  isLoggedAction,
  checkNewMessagesAction,
  checkNewNotificationsAction,
} from 'containers/App/actions';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';
import {
  TOGGLE_TOOLBAR_VIEWPORT_WIDTH,
  HIDDEN_TOOLBAR_TITLE_VIEWPORT_WIDTH,
} from 'utils/rwd';

// Import Components
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MailActiveIcon from '@material-ui/icons/Mail';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logo from 'images/icon.png';
import Sidebar from 'components/App/Sidebar';
import Messages from 'components/App/Messages';
import AppBarWrapper from './AppBarWrapper';
import ToolbarWrapper from './ToolbarWrapper';
import HamburgerWrapper from './HamburgerWrapper';
import TitleWrapper from './TitleWrapper';
import ItemWrapper from './ItemWrapper';
import ButtonWrapper from './ButtonWrapper';
import LogoWrapper from './LogoWrapper';
import ContentWrapper from './ContentWrapper';
import messages from './messages';
import BadgeWrapper from './BadgeWrapper';
import Notifications from '../Notifications';

function Header({
  children,
  location,
  isOpenNavigationMobile,
  isOpenNavigationDesktop,
  isOpenNotifications,
  isOpenMessages,
  isNewNotifications,
  isNewMessages,
  onToggleNavigationDesktop,
  onToggleNavigationMobile,
  onToggleMessages,
  onToggleNotifications,
  onLogout,
  isLogged,
  onCheckNewNotifications,
  onCheckNewMessages,
}) {
  useInjectSaga({ key: 'appPage', saga });
  useEffect(() => {
    isLogged();
    onCheckNewNotifications();
    onCheckNewMessages();
  }, []);

  const refWrapper = useRef(null);
  const title = {
    '/dashboard': <FormattedMessage {...messages.dashboardTitle} />,
    '/payment': <FormattedMessage {...messages.paymentTitle} />,
    '/history': <FormattedMessage {...messages.historyTitle} />,
    '/settings': <FormattedMessage {...messages.settingsTitle} />,
  };

  useOutsideWidgetDisabled(
    refWrapper,
    isOpenMessages,
    isOpenNotifications,
    onToggleMessages,
    onToggleNotifications,
  );

  return (
    <Fragment>
      <AppBarWrapper ref={refWrapper} open={isOpenNavigationDesktop}>
        <ToolbarWrapper open={isOpenNavigationDesktop}>
          <MediaQuery minWidth={TOGGLE_TOOLBAR_VIEWPORT_WIDTH}>
            {matches => (
              <HamburgerWrapper
                onClick={
                  matches ? onToggleNavigationDesktop : onToggleNavigationMobile
                }
              >
                <MenuIcon />
              </HamburgerWrapper>
            )}
          </MediaQuery>

          <TitleWrapper open={isOpenNavigationDesktop}>
            {title[location.pathname]}
          </TitleWrapper>

          <ButtonWrapper type="button" onClick={onToggleMessages}>
            {isNewMessages ? (
              <BadgeWrapper classes={{ badge: 'badge' }} badgeContent={1}>
                <MailActiveIcon className="icon" />
                <ItemWrapper>
                  <FormattedMessage {...messages.headerItemMessagesTitle} />
                </ItemWrapper>
              </BadgeWrapper>
            ) : (
              <BadgeWrapper classes={{ badge: 'badge' }} badgeContent={0}>
                <MailOutlineIcon className="icon" />
                <ItemWrapper>
                  <FormattedMessage {...messages.headerItemMessagesTitle} />
                </ItemWrapper>
              </BadgeWrapper>
            )}
            <Messages />
          </ButtonWrapper>

          <ButtonWrapper type="button" onClick={onToggleNotifications}>
            {isNewNotifications ? (
              <BadgeWrapper classes={{ badge: 'badge' }} badgeContent={1}>
                <NotificationsActiveIcon className="icon" />
                <ItemWrapper>
                  <FormattedMessage
                    {...messages.headerItemNotificationsTitle}
                  />
                </ItemWrapper>
              </BadgeWrapper>
            ) : (
              <BadgeWrapper classes={{ badge: 'badge' }} badgeContent={0}>
                <NotificationsNoneIcon className="icon" />
                <ItemWrapper>
                  <FormattedMessage
                    {...messages.headerItemNotificationsTitle}
                  />
                </ItemWrapper>
              </BadgeWrapper>
            )}
            <Notifications />
          </ButtonWrapper>

          <ButtonWrapper type="button" onClick={onLogout}>
            <ExitToAppIcon className="icon" />
            <ItemWrapper>
              <FormattedMessage {...messages.headerItemLogoutTitle} />
            </ItemWrapper>
          </ButtonWrapper>

          <LogoWrapper src={Logo} alt="Bank Application" />
        </ToolbarWrapper>
      </AppBarWrapper>
      <Sidebar />
      <ContentWrapper open={isOpenNavigationDesktop}>
        {children}
        <ResizeObserver
          onResize={() => {
            const evt = window.document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);
          }}
        />
      </ContentWrapper>

      <ResizeObserver
        onResize={rect => {
          if (
            rect.width <=
              parseInt(`${HIDDEN_TOOLBAR_TITLE_VIEWPORT_WIDTH}`, 10) &&
            isOpenNavigationDesktop
          ) {
            onToggleNavigationDesktop();
          }
        }}
      />
    </Fragment>
  );
}

function useOutsideWidgetDisabled(
  ref,
  isOpenMessages,
  isOpenNotifications,
  onToggleMessages,
  onToggleNotifications,
) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      if (isOpenMessages) onToggleMessages();
      if (isOpenNotifications) onToggleNotifications();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

Header.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
  isOpenNavigationMobile: PropTypes.bool,
  isOpenNavigationDesktop: PropTypes.bool,
  isOpenNotifications: PropTypes.bool,
  isOpenMessages: PropTypes.bool,
  isNewNotifications: PropTypes.bool,
  isNewMessages: PropTypes.bool,
  onToggleNavigationDesktop: PropTypes.func,
  onToggleNavigationMobile: PropTypes.func,
  onToggleMessages: PropTypes.func,
  onToggleNotifications: PropTypes.func,
  onLogout: PropTypes.func,
  isLogged: PropTypes.func,
  onCheckNewNotifications: PropTypes.func,
  onCheckNewMessages: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpenNavigationMobile: makeIsOpenNavigationMobileSelector(),
  isOpenNavigationDesktop: makeIsOpenNavigationDesktopSelector(),
  isOpenNotifications: makeIsOpenNotificationsSelector(),
  isOpenMessages: makeIsOpenMessagesSelector(),
  isNewNotifications: makeIsNewNotificationsSelector(),
  isNewMessages: makeIsNewMessagesSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onToggleNavigationDesktop: () => dispatch(toggleNavigationDesktopAction()),
    onToggleNavigationMobile: () => dispatch(toggleNavigationMobileAction()),
    onToggleMessages: () => dispatch(toggleMessagesAction()),
    onToggleNotifications: () => dispatch(toggleNotificationsAction()),
    onLogout: () => dispatch(logoutAction()),
    isLogged: () => dispatch(isLoggedAction()),
    onCheckNewNotifications: () => dispatch(checkNewNotificationsAction()),
    onCheckNewMessages: () => dispatch(checkNewMessagesAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
