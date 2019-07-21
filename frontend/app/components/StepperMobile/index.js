/* eslint-disable indent */

import styled from 'styled-components';
import MobileStepper from '@material-ui/core/MobileStepper';
import { PRIMARY_LIGHT } from 'utils/colors';

const StepperMobile = styled(MobileStepper)`
  &&& {
    background-color: ${PRIMARY_LIGHT};
    display: flex;
    justify-content: center;

    @media screen and (min-width: 880px) {
      display: none;
    }
  }
`;

export default StepperMobile;
