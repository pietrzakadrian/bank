/**
 *
 * TextWrapper
 *
 */

import styled from 'styled-components';

const TextWrapper = styled.span`
  display: block;
  letter-spacing: 0.3px;
  margin: 0 0 0 auto;
  white-space: nowrap; 
  max-width: 288px; 
  overflow: hidden;
  text-overflow: ellipsis; 
`;

export default TextWrapper;
