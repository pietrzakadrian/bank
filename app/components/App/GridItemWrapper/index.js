/* eslint-disable no-undef */
/**
 *
 * GridItemWrapper
 *
 */

import styled from 'styled-components';

const GridItemWrapper = styled.div`
  cursor: ${props => (props['data-grid'].static ? 'default' : 'move')};

  &.react-draggable-dragging {
    z-index: 1;
  }
`;

export default GridItemWrapper;
