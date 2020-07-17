/**
 *
 * WidgetBeamButton
 *
 */

import styled from 'styled-components';
import { PRIMARY_BLUE_LIGHT } from 'utils/colors';

const WidgetBeamButton = styled.div`
  font-size: 12.5px;
  color: ${PRIMARY_BLUE_LIGHT};
  padding: 0;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default WidgetBeamButton;
