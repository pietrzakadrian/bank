/**
 *
 * BankCards
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import SoftWidgetWrapper from 'components/App/SoftWidget/SoftWidgetWrapper';
import SoftWidgetHeader from 'components/App/SoftWidget/SoftWidgetHeader';
import SoftWidgetHeaderAction from 'components/App/SoftWidget/SoftWidgetHeaderAction';
import CardIcon from '@material-ui/icons/CreditCard';
import WidgetContentDisabled from 'components/App/WidgetContentDisabled';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function BankCards() {
  return (
    <SoftWidgetWrapper>
      <SoftWidgetHeader>
        <FormattedMessage {...messages.bankCards} />
        <SoftWidgetHeaderAction>
          <CardIcon /> <FormattedMessage {...messages.newCard} />
        </SoftWidgetHeaderAction>
      </SoftWidgetHeader>
      <WidgetContentDisabled>
        <FormattedMessage {...messages.cardDisabled} />
      </WidgetContentDisabled>
    </SoftWidgetWrapper>
  );
}

BankCards.propTypes = {};

export default BankCards;
