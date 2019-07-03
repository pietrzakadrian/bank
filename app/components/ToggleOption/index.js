/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const ToggleOption = ({ value, message, intl }) => (
  <option value={value}>{message ? intl.formatMessage(message) : value}</option>
);

ToggleOption.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  message: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ToggleOption);
