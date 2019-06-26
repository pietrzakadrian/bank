/**
 *
 * PaymentForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function PaymentForm() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

PaymentForm.propTypes = {};

export default PaymentForm;
