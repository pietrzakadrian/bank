/**
 *
 * DrawerWrapper
 *
 */

import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const DrawerWrapper = styled(Drawer)`
  &&& {
    @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
      flex-shrink: 0;
    }

    .drawer--paper {
      width: 260px;
      box-shadow: 4px 0px 8px -3px rgba(17, 17, 17, 0.06);
      overflow-x: hidden;
    }
  }
`;

export default DrawerWrapper;
