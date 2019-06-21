/**
 *
 * BankCredits
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import SoftWidgetWrapper from 'components/App/SoftWidget/SoftWidgetWrapper';
import SoftWidgetHeader from 'components/App/SoftWidget/SoftWidgetHeader';
import SoftWidgetHeaderAction from 'components/App/SoftWidget/SoftWidgetHeaderAction';
import WidgetContentDisabled from 'components/App/WidgetContentDisabled';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function BankCredits() {
  return (
    <SoftWidgetWrapper>
      <SoftWidgetHeader>
        <FormattedMessage {...messages.bankCredits} />
        <SoftWidgetHeaderAction>
          <AccountBalanceIcon /> <FormattedMessage {...messages.newCredit} />
        </SoftWidgetHeaderAction>
      </SoftWidgetHeader>
      <WidgetContentDisabled>
        <FormattedMessage {...messages.creditDisabled} />
      </WidgetContentDisabled>
    </SoftWidgetWrapper>
  );
}

BankCredits.propTypes = {};

export default BankCredits;
