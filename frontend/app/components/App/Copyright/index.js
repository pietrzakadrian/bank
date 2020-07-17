/**
 *
 * Copyright
 *
 */

import React from 'react';

// Import Components
import TextWrapper from './TextWrapper';
import CopyrightWrapper from './CopyrightWrapper';

export default function Copyright() {
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
