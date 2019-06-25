/**
 *
 * ContainerWrapper
 *
 */

import styled from 'styled-components';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const ContainerWrapper = styled.div`
  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    display: ${props => !props.open && 'flex'};
    justify-content: ${props => !props.open && 'space-evenly'};
  }

  @media screen and (min-width: 1050px) {
    display: flex;
    justify-content: space-evenly;
  }
`;

export default ContainerWrapper;
