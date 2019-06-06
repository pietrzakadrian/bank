import styled from 'styled-components';
import { SECONDARY_BLUE_LIGHT } from 'utils/colors';

const ButtonWrapper = styled.button`
  color: ${SECONDARY_BLUE_LIGHT};
  padding-left: 3px;

  &:hover {
    cursor: pointer;
  }
`;

export default ButtonWrapper;
