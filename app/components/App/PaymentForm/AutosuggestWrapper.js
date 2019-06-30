/**
 *
 * AutosuggestWrapper
 *
 */

import styled from 'styled-components';
import {
  PRIMARY_LIGHT,
  PRIMARY_BORDER_GREY,
  PRIMARY_RED,
  PRIMARY_BLUE_DARK,
  PRIMARY_BACKGROUND_GREY,
} from 'utils/colors';
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

      .react-autosuggest__suggestions-container--open {
        display: block;
        border: 1px solid ${PRIMARY_BORDER_GREY};
        background-color: ${PRIMARY_LIGHT};
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        font-size: 16px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        z-index: 2;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-height: 90px;
        overflow-y: auto;
        width: 90%;

        @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
          width: 300px;
        }

        .react-autosuggest__suggestion {
          cursor: pointer;
          padding: 10px 5px;

          &:hover {
            background-color: ${PRIMARY_BACKGROUND_GREY};
          }
        }

        .react-autosuggest__suggestions-list {
          margin: 0;
          padding: 0;
          list-style-type: none;

          .react-autosuggest__suggestions-list-name {
            color: ${PRIMARY_BLUE_DARK};
          }
        }
      }
    }
  }
`;

export default AutosuggestWrapper;
