/**
 *
 * WidgetContainer
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const WidgetContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: auto;
  }
`;

export default WidgetContainer;
