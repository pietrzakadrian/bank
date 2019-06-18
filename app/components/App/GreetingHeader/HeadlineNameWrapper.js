/**
 *
 * HeadlineNameWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_BLUE_DARK } from 'utils/colors';

const HeadlineNameWrapper = styled.span`
  font-weight: 700;
  color: ${PRIMARY_BLUE_DARK};
  text-overflow: ellipsis;
`;

export default HeadlineNameWrapper;
