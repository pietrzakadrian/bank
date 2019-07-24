/**
 *
 * AutosuggestInputWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const AutosuggestInputWrapper = styled.div`
   {
    position: relative;
    margin: 0 auto;
    height: 37px;
    width: 100%;

    @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
      width: 315px;
    }
  }
`;

export default AutosuggestInputWrapper;
