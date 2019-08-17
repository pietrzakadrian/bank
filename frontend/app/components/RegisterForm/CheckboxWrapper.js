/**
 *
 * CheckboxWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const CheckboxWrapper = styled.div`
  text-align: left;
  width: 90%;
  display: inline-flex;
  padding: 10px 0 0;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: 272px;
  }
`;

export default CheckboxWrapper;
