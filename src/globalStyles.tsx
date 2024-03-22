import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    font-family: "Plus Jakarta Sans", sans-serif;

    margin: 0;
    padding: 0;
    font-style: normal;

    height: 100vh;
  }
`;
