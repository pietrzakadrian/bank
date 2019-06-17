/**
 *
 * Header
 *
 */

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import ResizeObserver from 'react-resize-observer';
import MediaQuery from 'react-responsive';

// Import Components
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logo from 'images/icon.png';
import Sidebar from 'components/App/Sidebar';
import { TOGGLE_TOOLBAR_VIEWPORT_WIDTH } from 'utils/rwd';

import { FormattedMessage } from 'react-intl';
import {
  makeIsOpenNavigationMobileSelector,
  makeIsOpenNavigationDesktopSelector,
  makeIsOpenNotificationsSelector,
  makeIsOpenMessagesSelector,
} from 'containers/App/selectors';
import {
  toggleNavigationDesktopAction,
  toggleNavigationMobileAction,
  logoutAction,
  toggleMessagesAction,
  toggleNotificationsAction,
  isLoggedAction,
} from 'containers/App/actions';
import AppBarWrapper from './AppBarWrapper';
import ToolbarWrapper from './ToolbarWrapper';
import HamburgerWrapper from './HamburgerWrapper';
import TitleWrapper from './TitleWrapper';
import ItemWrapper from './ItemWrapper';
import ButtonWrapper from './ButtonWrapper';
import LogoWrapper from './LogoWrapper';
import ContentWrapper from './ContentWrapper';
import messages from './messages';

function Header({
  children,
  location,
  isOpenNavigationMobile,
  isOpenNavigationDesktop,
  isOpenNotifications,
  isOpenMessages,
  onToggleNavigationDesktop,
  onToggleNavigationMobile,
  onLogout,
  isLogged,
}) {
  const title = {
    '/dashboard': <FormattedMessage {...messages.dashboardTitle} />,
    '/payment': <FormattedMessage {...messages.paymentTitle} />,
    '/history': <FormattedMessage {...messages.historyTitle} />,
    '/settings': <FormattedMessage {...messages.settingsTitle} />,
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <Fragment>
      <AppBarWrapper open={isOpenNavigationDesktop}>
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

          <ButtonWrapper type="button">
            <MailOutlineIcon className="icon" />
            <ItemWrapper>
              <FormattedMessage {...messages.headerItemMessagesTitle} />
            </ItemWrapper>
          </ButtonWrapper>
          <ButtonWrapper type="button">
            <NotificationsNoneIcon className="icon" />
            <ItemWrapper>
              <FormattedMessage {...messages.headerItemNotificationsTitle} />
            </ItemWrapper>
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
    </Fragment>
  );
}

Header.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
  isOpenNavigationMobile: PropTypes.bool,
  isOpenNavigationDesktop: PropTypes.bool,
  isOpenNotifications: PropTypes.bool,
  isOpenMessages: PropTypes.bool,
  onToggleNavigationDesktop: PropTypes.func,
  onToggleNavigationMobile: PropTypes.func,
  onToggleMessages: PropTypes.func,
  onToggleNotifications: PropTypes.func,
  onLogout: PropTypes.func,
  isLogged: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpenNavigationMobile: makeIsOpenNavigationMobileSelector(),
  isOpenNavigationDesktop: makeIsOpenNavigationDesktopSelector(),
  isOpenNotifications: makeIsOpenNotificationsSelector(),
  isOpenMessages: makeIsOpenMessagesSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onToggleNavigationDesktop: () => dispatch(toggleNavigationDesktopAction()),
    onToggleNavigationMobile: () => dispatch(toggleNavigationMobileAction()),
    onToggleMessages: () => dispatch(toggleMessagesAction()),
    onToggleNotifications: () => dispatch(toggleNotificationsAction()),
    onLogout: () => dispatch(logoutAction()),
    isLogged: () => dispatch(isLoggedAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
