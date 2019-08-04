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
      box-shadow: 0em 0.0625em 0.1875em 0em rgba(0, 0, 0, 0.2),
        0em 0.0625em 0.0625em 0em rgba(0, 0, 0, 0.14),
        0em 0.125em 0.0625em -0.0625em rgba(0, 0, 0, 0.12);
      transition: unset;
    }
  }
`;

export default AlertDialogWrapper;
