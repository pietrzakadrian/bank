/**
 *
 * BankCards
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import {
  SoftWidgetHeader,
  SoftWidgetWrapper,
  SoftWidgetHeaderAction,
} from 'components/App/SoftWidget';
import CardIcon from '@material-ui/icons/CreditCard';
import WidgetContentDisabled from 'components/App/WidgetContentDisabled';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function BankCards() {
  return (
    <SoftWidgetWrapper>
      <SoftWidgetHeader>
        <FormattedMessage {...messages.bankCards} />
        <SoftWidgetHeaderAction onMouseDown={e => e.stopPropagation()}>
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
