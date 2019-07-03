/**
 *
 * Subheader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import LocaleToggle from 'components/LocaleToggle';
import SubheaderWrapper from './SubheaderWrapper';
import TitleWrapper from './TitleWrapper';
import LocaleToggleWrapper from './LocaleToggleWrapper';

function Subheader(props) {
  return (
    <SubheaderWrapper>
      <TitleWrapper>{props.title}</TitleWrapper>
      <LocaleToggleWrapper>
        <LocaleToggle />
      </LocaleToggleWrapper>
    </SubheaderWrapper>
  );
}

Subheader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Subheader;
