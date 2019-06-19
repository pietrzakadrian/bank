/**
 *
 * ContainerWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const ContainerWrapper = styled.main`
  position: relative;
  margin: 0.625em auto;
  width: 100%;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    max-width: 68.75em;
    width: calc(100% - 4.375em);
  }
`;

export default ContainerWrapper;
