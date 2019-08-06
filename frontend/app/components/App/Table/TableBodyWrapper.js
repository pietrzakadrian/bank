/**
 *
 * TableBodyWrapper
 *
 */

import styled from 'styled-components';
import TableBody from '@material-ui/core/TableBody';

const TableBodyWrapper = styled(TableBody)`
  &&& {
    max-height: 195px;

    tr {
      height: 49px;
    }
  }
`;

export default TableBodyWrapper;
