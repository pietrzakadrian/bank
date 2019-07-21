/**
 *
 * Information
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Components
import InformationWrapper from './InformationWrapper';
import MessageWrapper from './MessageWrapper';
import messages from './messages';

export default function Information() {
  return (
    <InformationWrapper>
      <MessageWrapper>
        <FormattedMessage {...messages.informationText} />
      </MessageWrapper>
    </InformationWrapper>
  );
}
