/**
 *
 * Copyright
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import TextWrapper from './TextWrapper';
import CopyrightWrapper from './CopyrightWrapper';

function Copyright() {
  return (
    <CopyrightWrapper>
      &copy; 2019{' '}
      <TextWrapper
        href="https://www.linkedin.com/in/pietrzakadrian/"
        target="_blank"
      >
        Adrian Pietrzak
      </TextWrapper>
      .
    </CopyrightWrapper>
  );
}

Copyright.propTypes = {};

export default Copyright;
