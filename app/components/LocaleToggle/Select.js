import styled from 'styled-components';
import { LINE_GREY } from 'utils/colors';

const Select = styled.select`
  font-family: 'Lato';
  display: inline-block;
  width: 100%;
  cursor: pointer;
  padding: 8px 10px;
  outline: 0;
  border: 1px solid ${LINE_GREY};
  border-radius: 2px;
  background: #ffffff;
  color: #000000;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 0.01px;
  text-overflow: '';
`;

export default Select;
