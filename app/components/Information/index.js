/**
 *
 * Information
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import InformationWrapper from './InformationWrapper';
import MessageWrapper from './MessageWrapper';

import messages from './messages';

function Information() {
  return (
    <InformationWrapper>
      <MessageWrapper>
        <FormattedMessage {...messages.informationText} />
      </MessageWrapper>
    </InformationWrapper>
  );
}

Information.propTypes = {};

export default Information;
