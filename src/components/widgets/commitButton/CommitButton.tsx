/* eslint-disable no-var */

import { ElementRef, useEffect, useMemo, useRef } from "react";
import { createGlobalStyle } from "styled-components";
import * as yup from "yup";
export const commitButtonPath = "/commit-button";

declare const Modal: (props: Record<string, unknown>) => any;

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
const emptyObject = {};
export function CommitButton() {
  const ref = useRef<ElementRef<"button">>(null);
  const props = window.xprops ?? emptyObject;
  const { renderToSelector, buttonStyle, ...commitWidgetProps } = props;
  useEffect(() => {
    if (
      ref.current &&
      typeof props.onGetDimensions === "function" &&
      props.onGetDimensions
    ) {
      const dimensionProps = {
        offsetHeight: ref.current.offsetHeight,
        offsetWidth: ref.current.offsetWidth,
        boundingClientRect: JSON.parse(
          JSON.stringify(ref.current.getBoundingClientRect())
        )
      };
      props.onGetDimensions?.(dimensionProps);
    }
  }, [props]);
  const buttonStyleObj = useMemo(() => {
    const buttonStyleValidated = yup
      .object({
        width: yup.string(),
        height: yup.string()
      })
      .validateSync(buttonStyle);
    if (typeof buttonStyle === "object") {
      return buttonStyleValidated;
    }
    return {} as typeof buttonStyleValidated;
  }, [buttonStyle]);
  return (
    <>
      <GlobalStyle />
      <button
        style={{
          width: buttonStyleObj.width,
          height: buttonStyleObj.height
        }}
        ref={ref}
        onClick={() => {
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
