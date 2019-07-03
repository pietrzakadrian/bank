/**
 *
 * BankInformation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';

import { HeavyWidgetWrapper } from 'components/App/HeavyWidget';
import { FormattedMessage } from 'react-intl';
import TextWrapper from './TextWrapper';
import messages from './messages';

function BankInformation() {
  return (
    <HeavyWidgetWrapper>
      <TextWrapper>
        <FormattedMessage {...messages.bankInformation} />
      </TextWrapper>
    </HeavyWidgetWrapper>
  );
}

BankInformation.propTypes = {};

export default BankInformation;
