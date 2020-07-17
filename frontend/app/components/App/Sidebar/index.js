/**
 *
 * Sidebar
 *
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MediaQuery from 'react-responsive';

// Import Components
import Divider from '@material-ui/core/Divider';
import Logo from 'components/Header/Logo';
import Footer from 'components/App/Footer';
import ImageWrapper from 'components/Header/ImageWrapper';
import Navigation from 'components/App/Navigation';
import HeaderWrapper from './HeaderWrapper';
import DrawerWrapper from './DrawerWrapper';

// Import Utils
import { TOGGLE_TOOLBAR_VIEWPORT_WIDTH } from 'utils/rwd';

// Import Actions
import {
  toggleNavigationDesktopAction,
  toggleNavigationMobileAction,
} from 'containers/App/actions';

// Import Selectors
import {
  makeIsOpenNavigationMobileSelector,
  makeIsOpenNavigationDesktopSelector,
} from 'containers/App/selectors';

const stateSelector = createStructuredSelector({
  isOpenNavigationMobile: makeIsOpenNavigationMobileSelector(),
  isOpenNavigationDesktop: makeIsOpenNavigationDesktopSelector(),
});

export default function Sidebar() {
  const dispatch = useDispatch();
  const onToggleNavigationDesktop = () =>
    dispatch(toggleNavigationDesktopAction());
  const onToggleNavigationMobile = () =>
    dispatch(toggleNavigationMobileAction());
  const { isOpenNavigationDesktop, isOpenNavigationMobile } = useSelector(
    stateSelector,
  );

  return (
    <MediaQuery minWidth={TOGGLE_TOOLBAR_VIEWPORT_WIDTH}>
      {matches => (
        <DrawerWrapper
          variant={matches ? 'persistent' : 'temporary'}
          open={matches ? isOpenNavigationDesktop : isOpenNavigationMobile}
          onClose={
            matches ? onToggleNavigationDesktop : onToggleNavigationMobile
          }
          classes={{
            paper: 'drawer--paper',
          }}
        >
          <HeaderWrapper>
            <ImageWrapper>
              <Logo src="/logo.png" alt="Bank Application" />
            </ImageWrapper>
          </HeaderWrapper>
          <Divider />
          <Navigation />
          <Footer />
        </DrawerWrapper>
      )}
    </MediaQuery>
  );
}
