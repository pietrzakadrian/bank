/**
 *
 * LoadingWrapper
 *
 */

import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const LoadingWrapper = styled(LinearProgress)`
  flex-grow: 1;
  left: 0;
  right: 0;
  position: absolute;
  margin: -17px auto 0;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    margin: -25px auto 0;
  }
`;

export default LoadingWrapper;
