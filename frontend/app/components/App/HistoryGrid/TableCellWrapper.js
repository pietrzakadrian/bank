/**
 *
 * TableCellWrapper
 *
 */

import styled from 'styled-components';
import { Table } from '@devexpress/dx-react-grid-material-ui';

const TableCellWrapper = styled(Table.Cell)`
  &&& {
    font-size: 14.5px;
    font-family: 'Lato';
  }
`;

export default TableCellWrapper;
