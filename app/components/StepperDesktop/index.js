/* eslint-disable indent */

import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import { PRIMARY_GREY, PRIMARY_LIGHT } from 'utils/colors';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const StepperDesktop = styled(Stepper)`
  &&& {
    background-color: ${props =>
      props.background === 'white' ? PRIMARY_LIGHT : PRIMARY_GREY};
    display: none;

    @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
      display: flex;
    }

    span {
      font-family: inherit;
    }
  }
`;

export default StepperDesktop;
