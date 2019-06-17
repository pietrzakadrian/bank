/**
 *
 * HeadlineWrapper
 *
 */

import styled from 'styled-components';

const HeadlineWrapper = styled.section`
  text-align: right;
  letter-spacing: 0.2px;
  font-size: 14px;
  opacity: ${props =>
    props.name &&
    props.surname &&
    (props.lastSuccessfulLogged || props.lastPresentLogged ? 1 : 0)};
`;

export default HeadlineWrapper;
