/**
 *
 * InputWraper
 *
 */

import styled from 'styled-components';
import {
  PRIMARY_LIGHT,
  PRIMARY_BORDER_GREY,
  PRIMARY_RED,
  PRIMARY_GREY,
} from 'utils/colors';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const InputWrapper = styled.input`
  background-color: ${props => (props.readOnly ? PRIMARY_GREY : PRIMARY_LIGHT)};
  padding: 10px;
  height: 37px;
  display: block;
  margin: 0 auto;
  border-radius: 2px;
  width: 90%;
  border: 1px solid
    ${props => (props.error ? PRIMARY_RED : PRIMARY_BORDER_GREY)};

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: ${props => (props.large ? '300px' : '17rem')};
  }
`;

export default InputWrapper;
