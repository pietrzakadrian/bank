/**
 *
 * AlertButtonWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_BLUE_LIGHT, SECONDARY_HOVER_GREY } from 'utils/colors';

const AlertButtonWrapper = styled.button`
  color: ${PRIMARY_BLUE_LIGHT};
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 3px;
  transition: 0.2s;
  display: block;

  &:hover {
    cursor: pointer;
    text-decoration: none;
    background-color: ${SECONDARY_HOVER_GREY};
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

export default AlertButtonWrapper;
