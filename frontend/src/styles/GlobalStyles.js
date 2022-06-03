import { createGlobalStyle } from 'styled-components';

import AVENGEANCEHEROICAVENGER from '../assets/fonts/AVENGEANCEHEROICAVENGER.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Font name';
    src: local('Font name'), url(${AVENGEANCEHEROICAVENGER}) format('truetype');
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Font name';
  }
  html, body #root {
    height: 100%;
  }
  *, button, input {
    border: 0;
    outline: 0;
    font-family: 'Font name' !important;
    text-transform: none !important;
  }
  button {
    cursor: pointer;
  }
  ::selection {
    background-color: red;
    color: white;
  }
`;
