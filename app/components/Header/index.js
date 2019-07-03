/**
 *
 * Header
 *
 */

import React from 'react';

// Import Components
import HeaderWrapper from './HeaderWrapper';
import ImageWrapper from './ImageWrapper';
import Logo from './Logo';
import Icon from './Icon';

function Header() {
  return (
    <HeaderWrapper>
      <ImageWrapper>
        <Logo src="/logo.png" alt="Bank Application" />
      </ImageWrapper>
      <ImageWrapper>
        <Icon src="/icon.png" alt="Bank Application" />
      </ImageWrapper>
    </HeaderWrapper>
  );
}

export default Header;
