/**
 *
 * RecentTransitionsRecipientNameWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_BLUE_DARK } from 'utils/colors';

const RecentTransitionsRecipientNameWrapper = styled.div`
  max-height: 20px;
  overflow: hidden;

  span:nth-child(2) {
    color: ${PRIMARY_BLUE_DARK};

    &::selection {
      color: ${PRIMARY_BLUE_DARK};
    }
  }
`;

export default RecentTransitionsRecipientNameWrapper;
