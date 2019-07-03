/**
 *
 * AmountFormatter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import AmountWrapper from './AmountWrapper';

function AmountFormatter({ value }) {
  return !value.indexOf('-') ? (
    <AmountWrapper>{value}</AmountWrapper>
  ) : (
    <span>{value}</span>
  );
}

AmountFormatter.propTypes = {};

export default AmountFormatter;
