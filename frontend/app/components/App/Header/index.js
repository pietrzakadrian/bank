/**
 *
 * Header
 *
 */

import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import PropTypes from 'prop-types';
import ResizeObserver from 'react-resize-observer';
import MediaQuery from 'react-responsive';
import saga from 'containers/App/saga';

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

// Import Utils
import {
  TOGGLE_TOOLBAR_VIEWPORT_WIDTH,
  HIDDEN_TOOLBAR_TITLE_VIEWPORT_WIDTH,
} from 'utils/rwd';

// Import Actions
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

// Import Selectors
import {
  makeIsLoggedSelector,
  makeIsOpenNavigationDesktopSelector,
  makeIsOpenNotificationsSelector,
  makeIsOpenMessagesSelector,
  makeIsNewNotificationsSelector,
  makeIsNewMessagesSelector,
  makeNotificationCountSelector,
  makeMessageCountSelector,
} from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  isLogged: makeIsLoggedSelector(),
  isOpenNavigationDesktop: makeIsOpenNavigationDesktopSelector(),
  isOpenNotifications: makeIsOpenNotificationsSelector(),
  isOpenMessages: makeIsOpenMessagesSelector(),
  isNewNotifications: makeIsNewNotificationsSelector(),
  isNewMessages: makeIsNewMessagesSelector(),
  notificationCount: makeNotificationCountSelector(),
  messageCount: makeMessageCountSelector(),
});

const key = 'appPage';
const title = {
  '/dashboard': <FormattedMessage {...messages.dashboardTitle} />,
  '/payment': <FormattedMessage {...messages.paymentTitle} />,
  '/history': <FormattedMessage {...messages.historyTitle} />,
  '/settings': <FormattedMessage {...messages.settingsTitle} />,
};

function useOutsideWidgetDisabled(ref) {
  const dispatch = useDispatch();
  const onToggleMessages = () => dispatch(toggleMessagesAction());
  const onToggleNotifications = () => dispatch(toggleNotificationsAction());
  const { isOpenMessages, isOpenNotifications } = useSelector(stateSelector);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  function handleClickOutside() {
    if (ref.current) {
      if (isOpenMessages) onToggleMessages();
      if (isOpenNotifications) onToggleNotifications();
    }
  }
}

export default function Header({ children, location }) {
  const refWrapper = useRef(null);
  const dispatch = useDispatch();
  const onToggleNavigationDesktop = () =>
    dispatch(toggleNavigationDesktopAction());
  const onToggleNavigationMobile = () =>
    dispatch(toggleNavigationMobileAction());
  const onLogout = () => dispatch(logoutAction());
  const onCheckUserLogged = () => dispatch(isLoggedAction());
  const onToggleMessages = () => dispatch(toggleMessagesAction());
  const onToggleNotifications = () => dispatch(toggleNotificationsAction());
  const onCheckNewNotifications = () => dispatch(checkNewNotificationsAction());
  const onCheckNewMessages = () => dispatch(checkNewMessagesAction());
  const {
    isLogged,
    notificationCount,
    messageCount,
    isOpenNavigationDesktop,
    isNewMessages,
    isNewNotifications,
  } = useSelector(stateSelector);

  useInjectSaga({ key, saga });

  useEffect(() => {
    if (!isLogged) onCheckUserLogged();
    else {
      onCheckNewNotifications();
      onCheckNewMessages();
    }
  }, [isLogged]);

  useOutsideWidgetDisabled(refWrapper);

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
              <BadgeWrapper
                classes={{ badge: 'badge' }}
                badgeContent={messageCount > 9 ? '9+' : messageCount}
              >
                <MailActiveIcon className="icon" />
                <ItemWrapper>
                  <FormattedMessage {...messages.headerItemMessagesTitle} />
                </ItemWrapper>
              </BadgeWrapper>
            ) : (
              <BadgeWrapper
                classes={{ badge: 'badge' }}
                badgeContent={messageCount}
              >
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
              <BadgeWrapper
                classes={{ badge: 'badge' }}
                badgeContent={notificationCount > 9 ? '9+' : notificationCount}
              >
                <NotificationsActiveIcon className="icon" />
                <ItemWrapper>
                  <FormattedMessage
                    {...messages.headerItemNotificationsTitle}
                  />
                </ItemWrapper>
              </BadgeWrapper>
            ) : (
              <BadgeWrapper
                classes={{ badge: 'badge' }}
                badgeContent={notificationCount}
              >
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

useOutsideWidgetDisabled.propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    key: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object,
    hash: PropTypes.string,
  }),
};
