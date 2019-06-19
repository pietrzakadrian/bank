/**
 *
 * FooterWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const FooterWrapper = styled.footer`
  position: relative;
  bottom: 0em;
  width: 16.25em;
  font-size: 0.875em;

  @media screen and (min-height: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    position: fixed;
  }
}
`;

export default FooterWrapper;
