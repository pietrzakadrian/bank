import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  position: fixed;
  height: 100%;
  overflow: hidden;
  width: 100%;
}

body {
  font-family: 'Lato', sans-serif;
  width: 100vw;
  height: 100%;
  overflow-y: auto;
  background-color: #fefefe!important;
  position: fixed;
}

#app {
  background-color: #fefefe;
  min-height: 100%;
  min-width: 100%;
  -webkit-overflow-scrolling: auto;
}

a {
  text-decoration: none;
}

p,
label {
  font-family: 'Lato', serif;
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

.recharts-surface {
  width: 75px !important;
  height: 75px !important;
}

@media screen and (max-height: 478px) {
  .footer--container {
    position: relative !important;
  }
}

@media screen and (max-width: 357px) {
  .trend--container {
    transform: scale(0.7);
    right: 0!important;
    top: 25px!important;
  }
}

@media screen and (max-width: 767px) {
  [class*="SnackbarItem"] {
    bottom: 0!important;
  }
}

[class*="variantSuccess"] {
  background-color: #0098db!important;
}

@-moz-document url-prefix() {
  select, select:-moz-focusring, select::-moz-focus-inner {
     color: transparent !important;
     text-shadow: 0 0 0 #000 !important;
     background-image: none !important;
     border:0;
  }
}

`;

export default GlobalStyle;
