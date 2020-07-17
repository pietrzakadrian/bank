/**
 *
 * TableCellWrapper
 *
 */

import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';

const TableCellWrapper = styled(TableCell)`
  &&& {
    height: ${props => props.loading && '193.24px'};
    cursor: auto;
    width: 50%;
    font-family: Lato;

    &:first-child {
      padding: 14.5px 0 15px 25px;
      text-align: left;
    }

    &:last-child {
      padding: 14.5px 25px 15px 0;
      text-align: right;
    }
  }
`;

export default TableCellWrapper;
