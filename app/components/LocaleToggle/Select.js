import styled from 'styled-components';
import { PRIMARY_DARK, PRIMARY_LIGHT } from 'utils/colors';

const Select = styled.select`
  display: inline-block;
  width: 100%;
  cursor: pointer;
  padding: 9px 11px;
  outline: 0;
  border: 1px solid ${PRIMARY_DARK};
  border-radius: 2px;
  background: ${PRIMARY_LIGHT};
  color: ${PRIMARY_DARK};
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 0.01px;
  text-overflow: '';
  height: 37px;

  &:focus {
    & ~ div {
      -webkit-transform: translateY(40%) rotate(225deg);
      -ms-transform: translateY(40%) rotate(225deg);
      transform: translateY(40%) rotate(225deg);
    }
  }
`;

export default Select;
