/**
 *
 * RecentTransitionsWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const RecentTransitionsWrapper = styled.span`
  max-height: 20px;
  overflow: hidden;
  display: ${props => props.title && 'block'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    max-width: 160px;
  }
`;

export default RecentTransitionsWrapper;
