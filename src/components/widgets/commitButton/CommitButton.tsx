/* eslint-disable no-var */
// import { CommitButton as BosonCommitButton } from "@bosonprotocol/react-kit";
import { ElementRef, useEffect, useRef } from "react";
import { createGlobalStyle } from "styled-components";

export const commitButtonPath = "/commit-button";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;

    font-family: "Plus Jakarta Sans", sans-serif;

    margin: 0;
    padding: 0;
    font-style: normal;

    height: unset;
  }
  #root{
    display: flex;
  }
`;
export function CommitButton() {
  const ref = useRef<ElementRef<"button">>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  console.log("CommitButton window.xprops", window.xprops);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { renderToSelector, ...commitWidgetProps } = window.xprops ?? {};
  useEffect(() => {
    if (ref.current) {
      const dimensionProps = {
        offsetHeight: ref.current.offsetHeight,
        offsetWidth: ref.current.offsetWidth,
        boundingClientRect: JSON.parse(
          JSON.stringify(ref.current.getBoundingClientRect())
        )
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.xprops.onGetDimensions(dimensionProps);
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <button
        ref={ref}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          Modal(commitWidgetProps).renderTo(
            window.parent,
            renderToSelector || "body",
            "iframe"
          );
        }}
      >
        Commit to Buy
      </button>
    </>
  );
}
