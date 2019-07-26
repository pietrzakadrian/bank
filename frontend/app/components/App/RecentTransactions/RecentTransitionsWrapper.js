/**
 *
 * RecentTransitionsWrapper
 *
 */

import styled from 'styled-components';

const RecentTransitionsWrapper = styled.span`
  max-height: 20px;
  overflow: hidden;
  display: ${props => props.title && 'block'};
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
`;

export default RecentTransitionsWrapper;
