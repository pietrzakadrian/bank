/**
 *
 * FooterWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const FooterWrapper = styled.footer`
  position: relative;
  bottom: 0px;
  width: 260px;
  font-size: 14px;

  @media screen and (min-height: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    position: fixed;
  }
}
`;

export default FooterWrapper;
