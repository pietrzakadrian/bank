/**
 *
 * ContainerWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const ContainerWrapper = styled.div`
  position: relative;
  margin: 10px auto 0;
  width: 100%;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    max-width: 1100px;
  }
`;

export default ContainerWrapper;
