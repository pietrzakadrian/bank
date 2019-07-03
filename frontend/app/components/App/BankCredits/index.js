/**
 *
 * BankCredits
 *
 */

import React from 'react';
import {
  SoftWidgetHeader,
  SoftWidgetWrapper,
  SoftWidgetHeaderAction,
} from 'components/App/SoftWidget';
import WidgetContentDisabled from 'components/App/WidgetContentDisabled';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function BankCredits() {
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

export default BankCredits;
