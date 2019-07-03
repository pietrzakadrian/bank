/**
 *
 * Footer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
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

Footer.propTypes = {};

export default Footer;
