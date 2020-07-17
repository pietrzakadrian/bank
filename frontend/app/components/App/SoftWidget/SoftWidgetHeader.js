/**
 *
 * SoftWidgetHeader
 *
 */

import styled from 'styled-components';
import { PRIMARY_BACKGROUND_GREY } from 'utils/colors';

const SoftWidgetHeader = styled.header`
  background-color: ${props =>
    props.noBackground ? 'none' : `${PRIMARY_BACKGROUND_GREY}`};
  padding: 7px 15px 7px 24px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  height: 46px;
`;

export default SoftWidgetHeader;
