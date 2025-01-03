import styled, {
  createGlobalStyle,
  css,
  CSSProperties,
  FlattenSimpleInterpolation
} from "styled-components";

export const Pre = styled.pre`
  all: unset;
  display: flex;
  width: calc(100vw - 3 * 1rem);
  background: #0000008b;

  padding: 1rem;
  border-radius: 5px;
  flex: 1 1;
`;

export const Widget = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

export const GlobalStyle = createGlobalStyle<{
  $bodyOverflow?: CSSProperties["overflow"] | null | undefined;
  $color?: CSSProperties["color"] | null | undefined;
  $htmlBodyRootStyle?: FlattenSimpleInterpolation;
  $htmlStyle?: FlattenSimpleInterpolation;
  $bodyStyle?: FlattenSimpleInterpolation;
  $rootStyle?: FlattenSimpleInterpolation;
}>`
html {
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
    ${({ $htmlStyle }) => $htmlStyle}
}
  html, body, #root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    font-family: "Plus Jakarta Sans", sans-serif;

    margin: 0;
    padding: 0;
    font-style: normal;
    ${({ $htmlBodyRootStyle }) => $htmlBodyRootStyle}
  }
  #root{
    ${({ $rootStyle }) => $rootStyle}
  }
  body {
    ${({ $bodyOverflow }) =>
      $bodyOverflow &&
      css`
        overflow: ${$bodyOverflow};
      `}
      ${({ $bodyStyle }) => $bodyStyle}
  }

  a,
  button,
  input,
  select,
  textarea {
    text-decoration: none;
    &:focus,
    &:hover {
      outline: none;
    }
    cursor: pointer;
  }

  select {
    -webkit-appearance: none;
  }

  input {
    user-select: text;
  }

  * {
    box-sizing: border-box;
  }

  * > small {
    font-size: 65%;
    margin: 0 0.5rem;
    opacity: 0.75;
    white-space: pre;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 600;
    line-height: 1.2;
  }
  h2 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.5;
  }
  h4, h5, h6 {
    font-size: 1.25rem;
    line-height: 1.5;
    margin: 0 0 1rem 0;
  }
  a, p, span, div {
    font-size: 1rem;
    line-height: 1.5;
  }
`;
