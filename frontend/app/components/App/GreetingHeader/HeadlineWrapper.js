/**
 *
 * HeadlineWrapper
 *
 */

import styled from 'styled-components';

const HeadlineWrapper = styled.section`
  text-align: right;
  max-width: 68.75em;
  margin: 0 0 0 auto;
  letter-spacing: 0.0125em;
  line-height: 1.25;
  font-size: 0.875em;
  opacity: ${props =>
    props.name &&
    props.surname &&
    (props.lastSuccessfulLogged || props.lastPresentLogged)
      ? 1
      : 0};
`;

export default HeadlineWrapper;
