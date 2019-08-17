/**
 *
 * HeadlineWrapper
 *
 */

import styled from 'styled-components';

const HeadlineWrapper = styled.section`
  text-align: right;
  max-width: 1100px;
  margin: 0 0 0 auto;
  letter-spacing: 0.2px;
  line-height: 1.25;
  font-size: 14px;
  opacity: ${props =>
    props.name &&
    props.surname &&
    (props.lastSuccessfulLogged || props.lastPresentLogged)
      ? 1
      : 0};
`;

export default HeadlineWrapper;
