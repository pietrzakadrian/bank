/**
 *
 * BankInformation
 *
 */

import React from 'react';

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

export default BankInformation;
