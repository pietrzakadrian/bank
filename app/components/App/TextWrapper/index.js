/**
 *
 * TextWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import { PRIMARY_RED } from 'utils/colors';

const TextWrapper = styled.span`
  margin: 0 auto;
  text-align: left;
  font-size: 13px;
  letter-spacing: 0.3px;
  width: 90%;
  height: 16px;
  display: block;
  color: ${props => (props.error ? PRIMARY_RED : 'inherit')};

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: ${props => (props.large ? '300px' : '17rem')};
  }
`;

export default TextWrapper;
