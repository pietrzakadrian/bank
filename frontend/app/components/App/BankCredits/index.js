/**
 *
 * BankCredits
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Components
import {
  SoftWidgetHeader,
  SoftWidgetWrapper,
  SoftWidgetHeaderAction,
} from 'components/App/SoftWidget';
import WidgetContentDisabled from 'components/App/WidgetContentDisabled';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import messages from './messages';

export default function BankCredits() {
  return (
    <SoftWidgetWrapper>
      <SoftWidgetHeader>
        <FormattedMessage {...messages.bankCredits} />
        <SoftWidgetHeaderAction onMouseDown={e => e.stopPropagation()}>
          <AccountBalanceIcon /> <FormattedMessage {...messages.newCredit} />
        </SoftWidgetHeaderAction>
      </SoftWidgetHeader>
      <WidgetContentDisabled>
        <FormattedMessage {...messages.creditDisabled} />
      </WidgetContentDisabled>
    </SoftWidgetWrapper>
  );
}
