/**
 *
 * TextWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_RED } from 'utils/colors';

const TextWrapper = styled.span`
  display: block;

  time {
    color: ${props => props.lastFailedLogged && PRIMARY_RED};
  }
`;

export default TextWrapper;
