/* eslint-disable no-undef */
/**
 *
 * GridItemWrapper
 *
 */

import styled from 'styled-components';

const GridItemWrapper = styled.div`
  cursor: ${props => (props['data-grid'].static ? 'default' : 'move')};
`;

export default GridItemWrapper;
