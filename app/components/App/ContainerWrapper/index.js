/**
 *
 * ContainerWrapper
 *
 */

import styled from 'styled-components';
import {
  PHONE_LANDSCAPE_VIEWPORT_WIDTH,
  DESKTOP_VIEWPORT_WIDTH,
} from 'utils/rwd';

const ContainerWrapper = styled.main`
  position: relative;
  margin: 10px auto;
  width: 100%;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    max-width: ${DESKTOP_VIEWPORT_WIDTH};
    width: calc(100% - 70px);
  }
`;

export default ContainerWrapper;
