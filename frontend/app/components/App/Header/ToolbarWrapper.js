/**
 *
 * ToolbarWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_LIGHT, PRIMARY_DARK, BORDER_GREY_LIGHT } from 'utils/colors';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import Toolbar from '@material-ui/core/Toolbar';

const ToolbarWrapper = styled(Toolbar)`
  &&& {
    color: ${PRIMARY_DARK};
    background-color: ${PRIMARY_LIGHT};
    height: 65px;
    border-bottom: 1px solid ${BORDER_GREY_LIGHT};
    justify-content: space-between;
    position: relative;
    min-height: 56px;
    padding: 0 16px;

    > button {
      &:first-child {
        width: 48px;
        height: 48px;
      }
    }

    @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
      justify-content: ${props => (props.open ? 'space-between' : 'normal')};
      max-height: 65px;
    }
  }
`;

export default ToolbarWrapper;
