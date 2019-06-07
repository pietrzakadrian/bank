/**
 *
 * RegisterForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function RegisterForm() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
