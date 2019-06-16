/**
 *
 * TitleWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_DARK } from 'utils/colors';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const TitleWrapper = styled.div`
  font-size: 21.5px;
  padding: 0 12px;
  display: none;
  color: ${PRIMARY_DARK};
  flex-grow: 1;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    display: block;
  }

  &.is--hidden {
    display: none;
  }
`;

export default TitleWrapper;
