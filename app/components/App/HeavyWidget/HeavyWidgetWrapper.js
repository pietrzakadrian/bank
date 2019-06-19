/**
 *
 * HeavyWidgetWrapper
 *
 */

import styled from 'styled-components';
import { BORDER_GREY_LIGHT, SECONDARY_BACKGROUND_GREY } from 'utils/colors';

const HeavyWidgetWrapper = styled.section`
  border: 0.0813em solid ${BORDER_GREY_LIGHT};
  padding: 1em 1.5em;
  height: 5.9375em;
  background-color: ${SECONDARY_BACKGROUND_GREY};
  position: relative;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;

export default HeavyWidgetWrapper;
