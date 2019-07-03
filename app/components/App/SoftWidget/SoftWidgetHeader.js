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
  padding: 0.4375em 15px 0.4375em 1.5em;
  font-size: 1.125em;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  min-height: 2.875em;
`;

export default SoftWidgetHeader;
