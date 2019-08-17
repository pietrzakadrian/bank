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
  color: ${PRIMARY_DARK};
  font-size: 21px;
  padding: 0 12px;
  flex-grow: 1;
  max-height: 26px;
  overflow: hidden;
  font-weight: 400;
  display: none;
  justify-content: left;
  align-items: center;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    display: ${props => (props.open ? 'none' : 'flex')};
  }

  @media screen and (min-width: ${HIDDEN_TOOLBAR_TITLE_VIEWPORT_WIDTH}) {
    display: flex;
  }
`;

export default TitleWrapper;
