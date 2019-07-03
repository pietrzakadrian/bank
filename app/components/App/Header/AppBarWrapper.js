/**
 *
 * AppBarWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_LIGHT } from 'utils/colors';
import AppBar from '@material-ui/core/AppBar';
import { TOGGLE_TOOLBAR_VIEWPORT_WIDTH } from 'utils/rwd';

const AppBarWrapper = styled(AppBar)`
  &&& {
    background-color: ${PRIMARY_LIGHT};
    padding: 0;
    margin-left: 16.25em;
    box-shadow: 0em 0.25em 0.5em -0.1875em rgba(17, 17, 17, 0.06);
    transition: width 0.3s;
    width: 100%;

    @media screen and (min-width: ${TOGGLE_TOOLBAR_VIEWPORT_WIDTH}) {
      width: ${props => props.open && 'calc(100% - 16.25em)'};
    }
  }
`;

export default AppBarWrapper;
