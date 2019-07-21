/**
 *
 * BankInformation
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Components
import { HeavyWidgetWrapper } from 'components/App/HeavyWidget';
import TextWrapper from './TextWrapper';
import messages from './messages';

export default function BankInformation() {
  return (
    <HeavyWidgetWrapper>
      <TextWrapper>
        <FormattedMessage {...messages.bankInformation} />
      </TextWrapper>
    </HeavyWidgetWrapper>
  );
}
