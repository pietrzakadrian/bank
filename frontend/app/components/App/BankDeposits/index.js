/**
 *
 * BankDeposits
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
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import messages from './messages';

export default function BankDeposits() {
  return (
    <SoftWidgetWrapper>
      <SoftWidgetHeader>
        <FormattedMessage {...messages.bankDeposits} />
        <SoftWidgetHeaderAction onMouseDown={e => e.stopPropagation()}>
          <TrendingUpIcon /> <FormattedMessage {...messages.newDeposit} />
        </SoftWidgetHeaderAction>
      </SoftWidgetHeader>
      <WidgetContentDisabled>
        <FormattedMessage {...messages.depositDisabled} />
      </WidgetContentDisabled>
    </SoftWidgetWrapper>
  );
}
