/**
 *
 * FlatButtonWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_BLUE_DARK } from 'utils/colors';

const FlatButtonWrapper = styled.button`
  color: ${PRIMARY_BLUE_DARK};
  padding: 0;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default FlatButtonWrapper;
