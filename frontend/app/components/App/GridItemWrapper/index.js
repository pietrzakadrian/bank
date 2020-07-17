/* eslint-disable no-undef */
/**
 *
 * GridItemWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const GridItemWrapper = styled.div`
  &.react-draggable-dragging {
    z-index: 1;
  }

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    cursor: ${props => (props['data-grid'].static ? 'default' : 'move')};
  }
`;

export default GridItemWrapper;
