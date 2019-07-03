/**
 *
 * Footer
 *
 */

import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextWrapper from './TextWrapper';
import FooterWrapper from './FooterWrapper';

function Footer() {
  return (
    <FooterWrapper>
      <Divider />
      <TextWrapper>
        <p>Bank Application 1.1</p> | <time>30.05.2019</time>
      </TextWrapper>
    </FooterWrapper>
  );
}

export default Footer;
