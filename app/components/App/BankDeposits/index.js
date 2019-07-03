/**
 *
 * BankDeposits
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';

import {
  SoftWidgetHeader,
  SoftWidgetWrapper,
  SoftWidgetHeaderAction,
} from 'components/App/SoftWidget';

import WidgetContentDisabled from 'components/App/WidgetContentDisabled';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function BankDeposits() {
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

BankDeposits.propTypes = {};

export default BankDeposits;
