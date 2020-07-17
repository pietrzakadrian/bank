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
  font-size: 13.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 3px;
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
    font-size: 20.8px;
  }

  span {
    &::selection {
      color: ${PRIMARY_BLUE_LIGHT};
    }
  }
`;

export default SoftWidgetHeaderAction;
