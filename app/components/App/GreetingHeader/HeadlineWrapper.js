/**
 *
 * HeadlineWrapper
 *
 */

import styled from 'styled-components';

const HeadlineWrapper = styled.section`
  text-align: right;
  letter-spacing: 0.0125em;
  font-size: 0.875em;
  opacity: ${props =>
    props.name &&
    props.surname &&
    (props.lastSuccessfulLogged || props.lastPresentLogged)
      ? 1
      : 0};
`;

export default HeadlineWrapper;
