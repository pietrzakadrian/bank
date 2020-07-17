/**
 *
 * AlertActionsWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const AlertActionsWrapper = styled.section`
  margin: 0 auto 10px;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    display: flex;
    justify-content: flex-end;
    margin: 0 10px 10px;
  }
`;

export default AlertActionsWrapper;
