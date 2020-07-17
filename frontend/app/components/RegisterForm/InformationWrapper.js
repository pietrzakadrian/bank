/**
 *
 * InformationWrapper
 *
 */

import styled from 'styled-components';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';
import { PRIMARY_BORDER_GREY } from 'utils/colors';

const InformationWrapper = styled.p`
  text-align: left;
  width: 90%;
  margin: 0 auto;
  font-size: 11px;
  color: ${PRIMARY_BORDER_GREY};
  line-height: 1.5;
  letter-spacing: 0.3px;
  padding-top: 10px;

  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: 272px;
  }
`;

export default InformationWrapper;
