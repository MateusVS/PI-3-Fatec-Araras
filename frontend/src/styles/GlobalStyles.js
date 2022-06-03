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
    color: #000 !important;
    border: 1px solid #000 !important;
    font-size: 19.2px !important;
    line-height: 50px !important;
  }
  ::selection {
    background-color: red;
    color: white;
  }
`;
