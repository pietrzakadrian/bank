/**
 *
 * NavLinkWrapper
 *
 */

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  PRIMARY_LIGHT,
  PRIMARY_GREY,
  PRIMARY_DARK,
  PRIMARY_BLUE_LIGHT,
} from 'utils/colors';

const NavLinkWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 46px;
  background-color: ${PRIMARY_LIGHT};
  text-decoration: none;
  color: ${PRIMARY_DARK};
  padding-left: 30px;

  &:hover {
    background-color: ${PRIMARY_GREY};
    cursor: pointer;
  }

  &.active {
    background-color: ${PRIMARY_BLUE_LIGHT};
    color: ${PRIMARY_LIGHT};
    pointer-events: none;
  }
`;

export default NavLinkWrapper;
