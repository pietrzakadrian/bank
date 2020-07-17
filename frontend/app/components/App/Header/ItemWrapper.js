/**
 *
 * ItemWrapper
 *
 */

import styled from 'styled-components';

const ItemWrapper = styled.span`
  display: none;
  font-size: 16px;

  @media screen and (min-width: 950px) {
    display: initial;
  }
`;

export default ItemWrapper;
