/**
 *
 * ButtonWrapper
 *
 */

import styled from 'styled-components';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';
import {
  SECONDARY_BLUE_LIGHT,
  PRIMARY_LIGHT,
  SECONDARY_BLUE_LIGHT_HOVER,
} from 'utils/colors';

const ButtonWrapper = styled.button`
  display: block;
  margin: 15px auto 10px;
  height: 35px;
  background-color: ${SECONDARY_BLUE_LIGHT};
  border-radius: 2px;
  color: ${PRIMARY_LIGHT};
  width: 90%;

  &:hover {
    background-color: ${SECONDARY_BLUE_LIGHT_HOVER};
    cursor: pointer;
  }

  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    width: 17rem;
  }
`;

export default ButtonWrapper;
