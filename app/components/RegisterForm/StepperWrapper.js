/**
 *
 * StepperWrapper
 *
 */

import { styled } from '@material-ui/styles';
import { PRIMARY_GREY } from 'utils/colors';
import Stepper from '@material-ui/core/Stepper';

const StepperWrapper = styled(Stepper)({
  backgroundColor: `${PRIMARY_GREY}`,
});

export default StepperWrapper;
