/**
 *
 * SelectWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const SelectWrapper = styled.div`
  height: 37px;
  display: block;
  margin: 0 auto;
  border-radius: 2px;
  width: 90%;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: 17rem;
  }
`;

export default SelectWrapper;
