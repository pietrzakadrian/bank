/**
 *
 * Sidebar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MediaQuery from 'react-responsive';

import Logo from 'components/Header/Logo';
import Footer from 'components/App/Footer';
import ImageWrapper from 'components/Header/ImageWrapper';
import Navigation from 'components/App/Navigation';
import Divider from '@material-ui/core/Divider';
import {
  makeIsOpenNavigationMobileSelector,
  makeIsOpenNavigationDesktopSelector,
} from 'containers/App/selectors';
import {
  toggleNavigationDesktopAction,
  toggleNavigationMobileAction,
} from 'containers/App/actions';
import { TOGGLE_TOOLBAR_VIEWPORT_WIDTH } from 'utils/rwd';
import HeaderWrapper from './HeaderWrapper';
import DrawerWrapper from './DrawerWrapper';

function Sidebar({
  isOpenNavigationDesktop,
  isOpenNavigationMobile,
  onToggleNavigationDesktop,
  onToggleNavigationMobile,
}) {
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

Sidebar.propTypes = {
  isOpenNavigationMobile: PropTypes.bool,
  isOpenNavigationDesktop: PropTypes.bool,
  onToggleNavigationDesktop: PropTypes.func,
  onToggleNavigationMobile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpenNavigationMobile: makeIsOpenNavigationMobileSelector(),
  isOpenNavigationDesktop: makeIsOpenNavigationDesktopSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    onToggleNavigationDesktop: () => dispatch(toggleNavigationDesktopAction()),
    onToggleNavigationMobile: () => dispatch(toggleNavigationMobileAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Sidebar);
