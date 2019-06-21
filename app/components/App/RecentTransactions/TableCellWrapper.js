/**
 *
 * TableCellWrapper
 *
 */

import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';

const TableCellWrapper = styled(TableCell)`
  &&& {
    cursor: auto;
    max-height: 48px;
    overflow: hidden;

    &:first-child {
      padding: 4px 0px 4px 25px;
      text-align: left;
      width: 55%;
    }

    &:last-child {
      padding: 4px 25px 4px 0;
      width: 45%;
      text-align: right;

      div {
        max-height: 20px;
        overflow: hidden;
      }
    }
  }
`;

export default TableCellWrapper;
