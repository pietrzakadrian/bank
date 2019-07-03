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
  font-size: 1.3438em;
  padding: 0 0.75em;
  flex-grow: 1;
  max-height: 1.625em;
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
