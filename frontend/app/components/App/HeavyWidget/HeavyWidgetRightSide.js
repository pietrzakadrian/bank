/**
 *
 * HeavyWidgetRightSide
 *
 */

import styled from 'styled-components';

const HeavyWidgetRightSide = styled.div`
  float: right;
  height: 100%;
  width: ${props => (props.pie ? '25%' : '30%')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HeavyWidgetRightSide;
