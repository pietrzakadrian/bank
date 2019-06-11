import { createGlobalStyle } from 'styled-components';
import { SECONDARY_BLUE_LIGHT } from 'utils/colors';
import {
  TABLET_VIEWPORT_WIDTH,
  PHONE_LANDSCAPE_VIEWPORT_WIDTH,
} from 'utils/rwd';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Lato', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label,
  h3 {
    font-family: 'Lato', Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

  input[type="color"],
  input[type="date"],
  input[type="datetime"],
  input[type="datetime-local"],
  input[type="email"],
  input[type="month"],
  input[type="number"],
  input[type="password"],
  input[type="search"],
  input[type="tel"],
  input[type="text"],
  input[type="time"],
  input[type="url"],
  input[type="week"],
  select:focus,
  textarea {
    font-size: 16px;
  }

  textarea:focus,
  input:focus,
  button:focus,
  select:focus {
    outline: none;
  }

  button {
    border: none;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
  }

  select:focus,
  textarea {
    font-size: 16px;
  }

  input[type='number'] {
    -moz-appearance:textfield;
  }

  .snackbar__provider,
  .snackbar__provider--open-menu,
  .snackbar__provider--close-menu {
    div {
      background-color: ${SECONDARY_BLUE_LIGHT}!important;
    }
  }
  
  @media screen and (max-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    .snackbar__provider, .snackbar__provider--open-menu  {
      left: 0!important;
      right: 0!important;
      bottom: 0!important;
    }
  }
  
  @media screen and (min-width: ${TABLET_VIEWPORT_WIDTH}) {
    .snackbar__provider--open-menu {
      left: 280px!important; 
      position: absolute; 
    }
  }
`;

export default GlobalStyle;
