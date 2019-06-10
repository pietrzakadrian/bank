/**
 *
 * StepperWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_GREY } from 'utils/colors';
import Stepper from '@material-ui/core/Stepper';

const StepperWrapper = styled(Stepper)`
  background-color: ${PRIMARY_GREY}!important;
`;

export default StepperWrapper;
