/**
 *
 * ButtonWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import {
  SECONDARY_BLUE_LIGHT,
  PRIMARY_LIGHT,
  PRIMARY_BLUE_LIGHT,
} from 'utils/colors';

const ButtonWrapper = styled.button`
  display: block;
  margin: ${props => (props.margin ? '0 auto' : '15px auto 5px')};
  height: 35px;
  background-color: ${SECONDARY_BLUE_LIGHT};
  border-radius: 2px;
  color: ${PRIMARY_LIGHT};
  width: 90%;

  &:hover {
    background-color: ${PRIMARY_BLUE_LIGHT};
    cursor: pointer;
  }

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: ${props => (props.large ? '300px' : '17rem')};
  }
`;

export default ButtonWrapper;
