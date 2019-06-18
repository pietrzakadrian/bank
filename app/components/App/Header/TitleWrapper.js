/**
 *
 * TitleWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_DARK } from 'utils/colors';
import {
  PHONE_LANDSCAPE_VIEWPORT_WIDTH,
  HIDDEN_TOOLBAR_TITLE_VIEWPORT_WIDTH,
} from 'utils/rwd';

const TitleWrapper = styled.h1`
  font-size: 21.5px;
  padding: 0 12px;
  color: ${PRIMARY_DARK};
  flex-grow: 1;
  max-height: 26px;
  overflow: hidden;
  font-weight: 400;
  display: none;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    display: ${props => (props.open ? 'none' : 'block')};
  }

  @media screen and (min-width: ${HIDDEN_TOOLBAR_TITLE_VIEWPORT_WIDTH}) {
    display: block;
  }
`;

export default TitleWrapper;
