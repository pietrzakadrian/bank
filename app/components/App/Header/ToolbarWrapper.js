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
    height: 4.0625em;
    border-bottom: 0.0625em solid ${BORDER_GREY_LIGHT};
    justify-content: space-between;
    position: relative;

    @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
      justify-content: ${props => (props.open ? 'space-between' : 'normal')};
    }
  }
`;

export default ToolbarWrapper;
