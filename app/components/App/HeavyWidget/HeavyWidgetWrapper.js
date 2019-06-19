/**
 *
 * HeavyWidgetWrapper
 *
 */

import styled from 'styled-components';
import { BORDER_GREY_LIGHT } from 'utils/colors';

const HeavyWidgetWrapper = styled.section`
  padding: 16px 24px;
  height: 95px;
  border: 1.3px solid ${BORDER_GREY_LIGHT};
  background-color: #f3f3f3;
  position: relative;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

export default HeavyWidgetWrapper;
