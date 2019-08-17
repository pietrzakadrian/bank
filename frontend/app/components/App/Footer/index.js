/**
 *
 * Footer
 *
 */

import React from 'react';

// Import Components
import Divider from '@material-ui/core/Divider';
import TextWrapper from './TextWrapper';
import FooterWrapper from './FooterWrapper';

export default function Footer() {
  return (
    <FooterWrapper>
      <Divider />
      <TextWrapper>
        <p>Bank Application 1.1</p> | <time>17.08.2019</time>
      </TextWrapper>
    </FooterWrapper>
  );
}
