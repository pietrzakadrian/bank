import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  position: fixed;
  height: 100%;
  overflow: hidden;
}

  html,
  body {

  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
}

  #app {
    background-color: #fefefe;
    min-height: 100%;
    min-width: 100%;
  }

  a {
    text-decoration: none;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .loadingHomePage {
    height: 100vh;
    padding: 0;
    margin: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loadingHomePageComponent {
   width: auto;
  }

  textarea:focus, input:focus, button:focus{
    outline: none;
  }

  ul {
    margin: 5px;
    padding-left: 25px;
  }

  input[type='number'] {
    -moz-appearance:textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
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

  [class*="SnackbarItem-variantSuccess"] {
    background-color: #0098db!important;
  }

  @media screen and (max-width: 767px) {
    [class*="SnackbarItem-root"] {
      bottom: 0!important;
    }
  }

  .recharts-surface {
    width: 75px!important;
    height: 75px!important;
  }

  @media screen and (max-width: 319px) {
    [class*="logoutButton"] {
      padding: 0 0.5vh!important;
    }
  }

  @media screen and (max-width: 357px) {
    [class*="AvailableFunds-trendContainer"], .recharts-wrapper {
      display: none!important;
    }
  }
`;

export default GlobalStyle;
