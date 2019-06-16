import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import { PRIMARY_GREY } from 'utils/colors';
import { TABLET_VIEWPORT_WIDTH } from 'utils/rwd';

const StepperDesktop = styled(Stepper)`
  &&& {
    background-color: ${PRIMARY_GREY};
    display: none;

    @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
      display: flex;
    }
  }
`;

export default StepperDesktop;
