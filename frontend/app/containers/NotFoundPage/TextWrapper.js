/**
 *
 * TextWrapper
 *
 */

import styled from 'styled-components';
import { TABLET_VIEWPORT_WIDTH, DESKTOP_VIEWPORT_WIDTH } from 'utils/rwd';

const TextWrapper = styled.p`
  margin: 25px auto;
  font-size: ${props => (props.large ? '20.5px' : '15.5px')};
  display: block;
  align-items: center;
  text-align: center;
  padding: 0 25px;
  max-width: ${DESKTOP_VIEWPORT_WIDTH};
  opacity: ${props => (props.large ? '1' : '0.5')};

  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    margin: 25px auto;
  }
`;

export default TextWrapper;
