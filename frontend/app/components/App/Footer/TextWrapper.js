/**
 *
 * TextWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_BORDER_GREY } from 'utils/colors';

const TextWrapper = styled.span`
  margin: 10px;
  text-align: center;
  display: block;
  color: ${PRIMARY_BORDER_GREY};

  p {
    display: initial;
    font-weight: 700;
  }
`;

export default TextWrapper;
