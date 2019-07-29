/**
 *
 * HeavyWidgetLeftSide
 *
 */

import styled from 'styled-components';

const HeavyWidgetLeftSide = styled.div`
  float: left;
  width: ${props => (props.pie ? '65%' : '70%')};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
`;

export default HeavyWidgetLeftSide;
