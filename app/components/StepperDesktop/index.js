import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import { PRIMARY_GREY } from 'utils/colors';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const StepperDesktop = styled(Stepper)`
  background-color: ${PRIMARY_GREY}!important;
  display: none !important;

  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    display: flex !important;
  }
`;

export default StepperDesktop;
