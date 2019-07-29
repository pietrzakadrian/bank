import styled from 'styled-components';
import { DESKTOP_VIEWPORT_WIDTH } from 'utils/rwd';

const StepperWrapper = styled.div`
  margin: 0 auto;
  max-width: ${DESKTOP_VIEWPORT_WIDTH};
  padding: 0 40px 8px;

  text {
    font-family: 'Lato';
  }
`;

export default StepperWrapper;
