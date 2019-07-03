/**
 *
 * HeaderCellWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_BLUE_DARK } from 'utils/colors';
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

const HeaderCellWrapper = styled(TableHeaderRow.Cell)`
  &&& {
    font-size: 16px;
    color: ${PRIMARY_BLUE_DARK};
    font-family: 'Lato';
    font-weight: 400;
    padding: 14px 8px;
    border-bottom: 1px solid rgb(224, 224, 224);
  }
`;

export default HeaderCellWrapper;
