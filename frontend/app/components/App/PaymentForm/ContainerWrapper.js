/**
 *
 * ContainerWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const ContainerWrapper = styled.div`
  position: relative;
  margin: 0.625em auto 0;
  width: 100%;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    max-width: 68.75em;
  }
`;

export default ContainerWrapper;
