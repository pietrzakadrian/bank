/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// Import Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderWrapper from 'components/Header/HeaderWrapper';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Header() {
  return (
    <HeaderWrapper>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" aria-label="Open drawer" edge="start">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </HeaderWrapper>
  );
}

Header.propTypes = {};

export default Header;
