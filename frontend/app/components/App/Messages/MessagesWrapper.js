/**
 *
 * MessagesWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_LIGHT, BORDER_GREY_LIGHT, TRANSPARENT } from 'utils/colors';
import {
  PHONE_LANDSCAPE_VIEWPORT_WIDTH,
  TABLET_VIEWPORT_WIDTH,
} from 'utils/rwd';

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${PRIMARY_LIGHT};
  border: 1.3px solid ${BORDER_GREY_LIGHT};
  border-radius: 2px;
  height: 139px;
  z-index: 9999;
  top: 55px;
  box-shadow: 0px 4px 8px -3px rgba(17, 17, 17, 0.22);
  display: ${props => (props.open ? 'flex' : 'none')};
  align-items: center;
  text-align: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;

  &:hover {
    cursor: auto;
  }

  &:before,
  &:after {
    bottom: 100%;
    left: 29.5%;
    border: solid transparent;
    content: ' ';
    height: 0;
    right: auto;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:before {
    border-color: ${TRANSPARENT};
    border-bottom-color: ${BORDER_GREY_LIGHT};
    border-width: 9px;
    margin-left: -9px;
  }

  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: ${PRIMARY_LIGHT};
    border-width: 7px;
    margin-left: -7px;
  }

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    &:before,
    &:after {
      left: auto;
      right: 187px;
    }

    &:before {
      margin-right: -9px;
      margin-left: auto;
    }

    &:after {
      margin-right: -7px;
      margin-left: auto;
    }
  }

  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    width: 330px;
    left: auto;
    right: 76px;

    &:before,
    &:after {
      right: 112px;
    }
  }

  @media screen and (min-width: 950px) {
    right: 285px;
  }
`;

export default MessagesWrapper;
