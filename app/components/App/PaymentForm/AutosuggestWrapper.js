/**
 *
 * AutosuggestWrapper
 *
 */

import styled from 'styled-components';
import { PRIMARY_LIGHT, PRIMARY_BORDER_GREY, PRIMARY_RED } from 'utils/colors';
import { PHONE_LANDSCAPE_VIEWPORT_WIDTH } from 'utils/rwd';

const AutosuggestWrapper = styled.div`
  &&& {
    .react-autosuggest__container {
      position: relative;

      .react-autosuggest__input {
        padding: 10px;
        height: 37px;
        display: block;
        margin: 0 auto;
        background-color: ${PRIMARY_LIGHT};
        border-radius: 2px;
        width: 90%;
        border: 1px solid
          ${props => (props.error ? PRIMARY_RED : PRIMARY_BORDER_GREY)};

        @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
          width: 300px;
        }
      }
    }
  }
`;

export default AutosuggestWrapper;
