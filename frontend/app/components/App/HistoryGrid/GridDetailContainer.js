/**
 *
 * GridDetailContainer
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { FormattedMessage } from 'react-intl';

// Import Components
import DetailContainerWrapper from './DetailContainerWrapper';
import HeaderDetailWrapper from './HeaderDetailWrapper';
import MainDetailWrapper from './MainDetailWrapper';
import ItemDetailWrapper from './ItemDetailWrapper';
import messages from './messages';

// Import Utils
import { TABLET_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

export default function GridDetailContainer({ row }) {
  const { sender_name, recipient_name, account_bill, transfer_title } = row;

  return (
    <DetailContainerWrapper>
      <MediaQuery maxWidth={TABLET_LANDSCAPE_VIEWPORT_WIDTH}>
        {matches =>
          matches ? (
            <Fragment>
              <ItemDetailWrapper>
                <HeaderDetailWrapper>
                  <FormattedMessage {...messages.sender} />
                </HeaderDetailWrapper>
                <MainDetailWrapper>{sender_name}</MainDetailWrapper>
              </ItemDetailWrapper>

              <ItemDetailWrapper>
                <HeaderDetailWrapper>
                  <FormattedMessage {...messages.recipient} />
                </HeaderDetailWrapper>
                <MainDetailWrapper>{recipient_name}</MainDetailWrapper>
              </ItemDetailWrapper>

              <ItemDetailWrapper>
                <HeaderDetailWrapper>
                  <FormattedMessage {...messages.accountNumber} />
                </HeaderDetailWrapper>
                <MainDetailWrapper>{account_bill}</MainDetailWrapper>
              </ItemDetailWrapper>

              <ItemDetailWrapper>
                <HeaderDetailWrapper>
                  <FormattedMessage {...messages.transferTitle} />
                </HeaderDetailWrapper>
                <MainDetailWrapper>{transfer_title}</MainDetailWrapper>
              </ItemDetailWrapper>
            </Fragment>
          ) : (
            <Fragment>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.accountNumber} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{account_bill}</MainDetailWrapper>
            </Fragment>
          )
        }
      </MediaQuery>
    </DetailContainerWrapper>
  );
}

GridDetailContainer.propTypes = {
  row: PropTypes.shape({
    account_bill: PropTypes.string.isRequired,
    amount_money: PropTypes.string.isRequired,
    date_time: PropTypes.string.isRequired,
    recipient_name: PropTypes.string.isRequired,
    sender_name: PropTypes.string.isRequired,
    transfer_title: PropTypes.string.isRequired,
  }).isRequired,
};
