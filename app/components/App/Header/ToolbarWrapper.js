/**
 *
 * ToolbarWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_LIGHT, PRIMARY_DARK } from 'utils/colors';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import Toolbar from '@material-ui/core/Toolbar';

const ToolbarWrapper = styled(Toolbar)`
  &&& {
    height: 65px;
    color: ${PRIMARY_DARK};
    background-color: ${PRIMARY_LIGHT};
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    justify-content: space-between;
    position: relative;

    @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
      justify-content: ${props => (props.open ? 'space-between' : 'normal')};
    }
  }
`;

export default ToolbarWrapper;
