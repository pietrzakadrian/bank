/**
 *
 * SoftWidgetHeaderAction
 *
 */

import styled from 'styled-components';
import { PRIMARY_BLUE_LIGHT, SECONDARY_HOVER_GREY } from 'utils/colors';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const SoftWidgetHeaderAction = styled.button`
  color: ${PRIMARY_BLUE_LIGHT};
  font-size: 0.7188em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25em 0.5em;
  border-radius: 0.1875em;
  transition: 0.2s;
  display: none;

  &:hover {
    cursor: pointer;
    text-decoration: none;
    background-color: ${SECONDARY_HOVER_GREY};
  }

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    display: block;
  }

  svg {
    font-size: 1.3em;
  }

  span {
    &::selection {
      color: ${PRIMARY_BLUE_LIGHT};
    }
  }
`;

export default SoftWidgetHeaderAction;
