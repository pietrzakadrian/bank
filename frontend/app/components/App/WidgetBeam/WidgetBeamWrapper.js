/**
 *
 * WidgetBeamWrapper
 *
 */

import styled from 'styled-components';
import { BORDER_GREY_LIGHT } from 'utils/colors';

const WidgetBeamWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${BORDER_GREY_LIGHT};
  padding: 5.5px 14px;
  width: 100%;
`;

export default WidgetBeamWrapper;
