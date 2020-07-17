/* eslint-disable indent */

import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import { PRIMARY_LIGHT } from 'utils/colors';

const StepperDesktop = styled(Stepper)`
  &&& {
    text-align: center;
    background-color: ${PRIMARY_LIGHT};
    display: none;

    @media screen and (min-width: 950px) {
      display: flex;
    }

    span {
      font-family: inherit;
    }
  }
`;

export default StepperDesktop;
