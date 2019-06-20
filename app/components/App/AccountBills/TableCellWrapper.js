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
    padding: 12px 25px;
    width: 50%;
  }
`;

export default TableCellWrapper;
