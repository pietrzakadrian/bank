/**
 *
 * RecentTransitionsRecipientNameWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_BLUE_DARK } from 'utils/colors';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const RecentTransitionsRecipientNameWrapper = styled.div`
  max-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;

  span:nth-child(2) {
    color: ${PRIMARY_BLUE_DARK};

    &::selection {
      color: ${PRIMARY_BLUE_DARK};
    }
  }

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    max-width: 160px;
  }
`;

export default RecentTransitionsRecipientNameWrapper;
