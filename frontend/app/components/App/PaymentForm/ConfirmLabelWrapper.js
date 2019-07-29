/**
 *
 * ConfirmLabelWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import { PRIMARY_BLUE_DARK, BORDER_GREY_LIGHT } from 'utils/colors';

const ConfirmLabelWrapper = styled.label`
  font-weight: ${props => !props.recipient && !props.date && 'bold'};
  margin: 0px auto 1px;
  display: block;
  text-align: left;
  color: ${props =>
    (props.recipient && PRIMARY_BLUE_DARK) ||
    (props.date && BORDER_GREY_LIGHT)};
  width: 90%;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: 315px;
  }
`;

export default ConfirmLabelWrapper;
