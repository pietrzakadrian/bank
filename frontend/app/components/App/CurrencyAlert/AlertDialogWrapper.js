/**
 *
 * AlertDialogWrapper
 *
 */

import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

const AlertDialogWrapper = styled(Dialog)`
  &&& {
    .paper {
      margin: 5px;
      padding: 15px;
      border-radius: 0;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2),
        0 1px 1px 0 rgba(0, 0, 0, 0.14),
        0 2px 1px -1px rgba(0, 0, 0, 0.12);
      transition: unset;
    }
  }
`;

export default AlertDialogWrapper;
