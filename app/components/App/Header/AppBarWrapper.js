/**
 *
 * AppBarWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_LIGHT } from 'utils/colors';
import AppBar from '@material-ui/core/AppBar';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const AppBarWrapper = styled(AppBar)`
  &&& {
    background-color: ${PRIMARY_LIGHT};
    padding: 0;
    margin-left: 260px;
    box-shadow: 0px 4px 8px -3px rgba(17, 17, 17, 0.06);
    transition: width 0.3s;

    @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
      width: ${props => props.open && 'calc(100% - 260px)'};
    }
  }
`;

export default AppBarWrapper;
