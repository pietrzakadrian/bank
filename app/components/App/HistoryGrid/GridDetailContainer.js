/**
 *
 * GridDetailContainer
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { TABLET_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import { FormattedMessage } from 'react-intl';
import DetailContainerWrapper from './DetailContainerWrapper';
import HeaderDetailWrapper from './HeaderDetailWrapper';
import MainDetailWrapper from './MainDetailWrapper';
import messages from './messages';

function GridDetailContainer({ row }) {
  const { sender_name, recipient_name, account_bill, transfer_title } = row;

  return (
    <DetailContainerWrapper>
      <MediaQuery maxWidth={TABLET_LANDSCAPE_VIEWPORT_WIDTH}>
        {matches =>
          matches ? (
            <Fragment>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.sender} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{sender_name}</MainDetailWrapper>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.recipient} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{recipient_name}</MainDetailWrapper>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.accountNumber} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{account_bill}</MainDetailWrapper>
              <HeaderDetailWrapper>
                <FormattedMessage {...messages.transferTitle} />
              </HeaderDetailWrapper>
              <MainDetailWrapper>{transfer_title}</MainDetailWrapper>
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
  row: PropTypes.object.isRequired,
};

export default GridDetailContainer;
