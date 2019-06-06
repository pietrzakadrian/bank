import styled from 'styled-components';

const Arrow = styled.div`
  position: absolute;
  top: 11px;
  right: 15px;
  width: 10px;
  height: 10px;
  border: solid #0029ab;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -webkit-transition: 0.25s ease;
  -o-transition: 0.25s ease;
  transition: 0.25s ease;
`;

export default Arrow;
